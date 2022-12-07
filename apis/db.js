const db = require('mongoose')

const config = require('./config')

exports.connect = () => {

	db.connect(config.mongoUri).then(() => {
		console.log(`Database connected @ ${process.pid}`)
	}).catch((error) => {
		console.log(error)
	})

}