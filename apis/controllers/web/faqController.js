const faqs = require('../../models/web/faqModel')

const createFAQs = async (req, res) => {

	await faqs.create(req.body).then((response) => {
		res.send(response)
	}).catch((error) => {
		res.send(error.message)
	})

}

const readFAQs = async (req, res) => {

	await faqs.find().then((response) => {
		res.send(response)
	}).catch((error) => {
		res.send(error.message)
	})

}

const updateFAQs = async (req, res) => {

	await faqs.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((response) => {
		res.send(response)
	}).catch((error) => {
		res.send(error.message)
	})

}

const deleteFAQs = async (req, res) => {

	await faqs.findByIdAndDelete(req.params.id).then(() => {
		res.send('Deleted successfully')
	}).catch((error) => {
		res.send(error.message)
	})

}

const findFAQs = async (req, res) => {

	await faqs.findById(req.params.id).then((response) => {
		res.send(response)
	}).catch((error) => {
		res.send(error.message)
	})

}

module.exports = {
	createFAQs,
	readFAQs,
	updateFAQs,
	deleteFAQs,
	findFAQs
}
