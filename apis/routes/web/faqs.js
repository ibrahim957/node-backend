const Router = require('express-group-router')

const apiKey = require('../../middleware/apiKey')

const faqController = require('../../controllers/web/faqController')

const router = new Router()

router.group('/', apiKey, (router) => {

	router.post('/', faqController.createFAQs)
	router.get('/', faqController.readFAQs)
	router.put('/:id', faqController.updateFAQs)
	router.delete('/:id', faqController.deleteFAQs)
	router.get('/:id', faqController.findFAQs)

})

module.exports = router.init()
