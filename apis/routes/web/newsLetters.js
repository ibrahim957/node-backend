const Router = require('express-group-router')

const apiKey = require('../../middleware/apiKey')

const newsLetterController = require('../../controllers/web/newsLetterController')

const router = new Router()

router.group('/', apiKey, (router) => {

	router.post('/', newsLetterController.createNewsLetters)
	router.get('/', newsLetterController.readNewsLetters)
	router.put('/:id', newsLetterController.updateNewsLetters)
	router.delete('/:id', newsLetterController.deleteNewsLetters)
	router.get('/:id', newsLetterController.findNewsLetters)

})

module.exports = router.init()
