const pressReleases = require('../../models/web/pressReleaseModel')

const createPressReleases = async (req, res) => {

	await pressReleases.create(req.body).then( async(response) => {
		res.send(response)
	}).catch((error) => {
		res.send(error.message)
	})

}

const readPressReleases = async (req, res) => {

	await pressReleases.find().then (async (response) => {
		res.send(response)
	}).catch((error) => {
		res.send(error.message)
	})

}

const updatePressReleases = async (req, res) => {

	await pressReleases.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((response) => {
		res.send(response)
	}).catch((error) => {
		res.send(error.message)
	})

}

const deletePressReleases = async (req, res) => {

	await pressReleases.findByIdAndDelete(req.params.id).then(() => {
		res.send('Deleted successfully')
	}).catch((error) => {
		res.send(error.message)
	})

}

const findPressReleases = async (req, res) => {

	await pressReleases.findById(req.params.id).then((response) => {
		res.send(response)
	}).catch((error) => {
		res.send(error.message)
	})

}

module.exports = {
	createPressReleases,
	readPressReleases,
	updatePressReleases,
	deletePressReleases,
	findPressReleases
}
