const Router = require('express-group-router')

const apiKey = require('../../middleware/apiKey')

const blogController = require('../../controllers/web/blogController')

const router = new Router()

router.group('/', apiKey, (router) => {

	router.post('/', blogController.createBlogs)
	router.get('/', blogController.readBlogs)
	router.put('/:id', blogController.updateBlogs)
	router.delete('/:id', blogController.deleteBlogs)
	router.get('/:id', blogController.findBlogs)

})

module.exports = router.init()
