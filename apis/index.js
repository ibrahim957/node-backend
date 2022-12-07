const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const morgan = require('morgan')
const helmet = require('helmet')
const xss = require('xss-clean')
const cluster = require('cluster')
const os = require('os')
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require('mongoose')

const db = require('./db')
const config = require('./config')
const swagger = require('./swagger')

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
const cpus = os.cpus().length

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger))
app.use(morgan('combined'))
app.use(helmet())
app.use(xss())

app.use('/api/blogs', require('./routes/web/blogs'))
app.use('/api/faqs', require('./routes/web/faqs'))
app.use('/api/news-letters', require('./routes/web/newsLetters'))
app.use('/api/press-releases', require('./routes/web/pressReleases'))
app.use('/api/drivers', require('./routes/mobile/drivers'))
app.use('/api/riders', require('./routes/mobile/riders'))
app.use('/api/fakers', require('./routes/faker/fakers'))
app.use('/api/payments', require('./routes/mobile/payments'))

app.use('/assets', express.static('assets'))

app.use(require('./middleware/errorHandler'))


if(cluster.isMaster) {

	for(let i = 0; i < cpus; i++) {
		cluster.fork()
	}

	cluster.on('exit', () => {
		console.log(`Worker ${process.pid} died`)
		cluster.fork()
	})

} else {
	httpServer.listen(config.port, '192.168.1.123', () => {
		console.log(`Server ${process.pid} listening @ ${config.hostUrl}`)
		db.connect()
	})

	mongoose.connect(config.mongoUri )
	const connection = mongoose.connection

	connection.once("open", () => {
		console.log("MongoDB database connected");

		console.log("Setting change streams");
		const rideChangeStream = connection.collection("rides").watch();

		rideChangeStream.on("change", (change) => {
			switch (change.operationType) {
			case "update":
				 io.emit("ride-status", change.documentKey._id);
				break;
			}
		})
	})

	io.on("connection", (socket) => {
		console.log('user connected ' + socket.id)

		socket.on('disconnect', () => {
			console.log('Socket.io: User Disconnected ',socket.id)
		})
	})

}