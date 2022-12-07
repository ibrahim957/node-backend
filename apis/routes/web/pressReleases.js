const Router = require('express-group-router')

const apiKey = require('../../middleware/apiKey')

const pressReleaseController = require('../../controllers/web/pressReleaseController')

const router = new Router()

router.group('/', apiKey, (router) => {

	router.post('/', pressReleaseController.createPressReleases)
	router.get('/', pressReleaseController.readPressReleases)
	router.put('/:id', pressReleaseController.updatePressReleases)
	router.delete('/:id', pressReleaseController.deletePressReleases)
	router.get('/:id', pressReleaseController.findPressReleases)

})

module.exports = router.init()
