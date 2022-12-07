const newsLetters = require('../../models/web/newsLetterModel')

const createNewsLetters = async (req, res) => {

	await newsLetters.create(req.body).then((response) => {
		res.send(response)
	}).catch((error) => {
		res.send(error.message)
	})

}

const readNewsLetters = async (req, res) => {

	await newsLetters.find().then((response) => {
		res.send(response)
	}).catch((error) => {
		res.send(error.message)
	})

}

const updateNewsLetters = async (req, res) => {

	await newsLetters.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((response) => {
		res.send(response)
	}).catch((error) => {
		res.send(error.message)
	})

}

const deleteNewsLetters = async (req, res) => {

	await newsLetters.findByIdAndDelete(req.params.id).then(() => {
		res.send('Deleted successfully')
	}).catch((error) => {
		res.send(error.message)
	})

}

const findNewsLetters = async (req, res) => {

	await newsLetters.findById(req.params.id).then((response) => {
		res.send(response)
	}).catch((error) => {
		res.send(error.message)
	})

}

module.exports = {
	createNewsLetters,
	readNewsLetters,
	updateNewsLetters,
	deleteNewsLetters,
	findNewsLetters
}
