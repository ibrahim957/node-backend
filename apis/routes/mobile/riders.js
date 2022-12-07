const Router = require('express-group-router')

const apiKey = require('../../middleware/apiKey')
const authToken = require('../../middleware/authToken')

const authController = require('../../controllers/mobile/rider/authController')
const profileController = require('../../controllers/mobile/rider/profileController')
const rideController = require('../../controllers/mobile/rider/rideController')

const router = new Router()

router.group('/', apiKey, (router) => {

	router.post('/sign-in', authController.signIn)
	router.post('/resend-code', authController.resend)
	router.post('/verify', authController.verify)

	router.group('/', authToken, (router) => {

		router.post('/log-out', authController.logOut)
		router.post('/policy', profileController.policy)
		router.post('/profile', profileController.profile)
		router.post('/update-profile', profileController.updateProfile)
		router.get('/get-profile', profileController.getProfile)
		router.post('/payment', profileController.payment)
		router.get('/all-payment', profileController.allPayments)
		router.post('/default-payment/:payment_id', profileController.defaultPayment)
		router.post('/delete-payment/:payment_id', profileController.deletePayment)
		router.post('/help-center', profileController.helpCenter)
		router.post('/new-ride', rideController.newRide)
		router.get('/ride-offers/:ride_id', rideController.rideOffers)
		router.post('/accept-offer/:offer_id', rideController.acceptOffer)
		router.get('/all-rides', rideController.allRides)
		router.get('/retry-payment', rideController.retryPayment)
		router.get('/ride-details/:ride_id', rideController.rideDetails)
		router.post('/ride-feedback/:ride_id', rideController.rideFeedback)
		router.post('/ride-feedback-skipped/:ride_id', rideController.rideFeedbackSkipped)
		router.post('/tip-ride/:ride_id', rideController.tipRide)
		router.post('/cancel-ride/:ride_id', rideController.cancelRide)
	})

})

module.exports = router.init()
