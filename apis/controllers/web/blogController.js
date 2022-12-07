const blogs = require('../../models/web/blogModel')

const createBlogs = async (req, res) => {

	await blogs.create(req.body).then((response) => {
		res.send(response)
	}).catch((error) => {
		res.send(error.message)
	})

}

const readBlogs = async (req, res) => {

	await blogs.find().then((response) => {
		res.send(response)
	}).catch((error) => {
		res.send(error.message)
	})

}

const updateBlogs = async (req, res) => {

	await blogs.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((response) => {
		res.send(response)
	}).catch((error) => {
		res.send(error.message)
	})

}

const deleteBlogs = async (req, res) => {

	await blogs.findByIdAndDelete(req.params.id).then(() => {
		res.send('Deleted successfully')
	}).catch((error) => {
		res.send(error.message)
	})

}

const findBlogs = async (req, res) => {

	await blogs.findById(req.params.id).then((response) => {
		res.send(response)
	}).catch((error) => {
		res.send(error.message)
	})

}

module.exports = {
	createBlogs,
	readBlogs,
	updateBlogs,
	deleteBlogs,
	findBlogs
}
