const Router = require('express-group-router')

const apiKey = require('../../middleware/apiKey')
const authToken = require('../../middleware/authToken')

const paymentController = require('../../controllers/mobile/payment/mainController')

const router = new Router()

router.get('/stripe-refresh-url/:id', paymentController.stripeRefreshUrl)
router.get('/stripe-return-url', paymentController.stripeReturnUrl)

router.group('/', apiKey, (router) => {

	router.group('/', authToken, () => {

	})

})

module.exports = router.init()
