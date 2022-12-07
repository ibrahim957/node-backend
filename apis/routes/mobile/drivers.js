const Router = require('express-group-router')

const apiKey = require('../../middleware/apiKey')
const authToken = require('../../middleware/authToken')

const authController = require('../../controllers/mobile/driver/authController')
const profileController = require('../../controllers/mobile/driver/profileController')
const rideController = require('../../controllers/mobile/driver/rideController')

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
		router.post('/driver-license', profileController.driverLicense)
		router.post('/commercial-insurance', profileController.commercialInsurance)
		router.post('/personal-insurance', profileController.personalInsurance)
		router.post('/criminal-record', profileController.criminalRecord)
		router.post('/driving-record', profileController.drivingRecord)
		router.post('/add-vehicle/:vehicle_id', profileController.addVehicle)
		router.post('/delete-vehicle/:vehicle_id', profileController.deleteVehicle)
		router.get('/all-vehicles', profileController.allVehicles)
		router.post('/default-vehicle/:id', profileController.defaultVehicle)
		router.post('/vehicle-registration/:vehicle_id', profileController.vehicleRegistration)
		router.post('/security-information', profileController.securityInformation)
		router.get('/bank-information', profileController.bankInformation)
		router.get('/bank-information-status', profileController.checkBankAccountStatus)
		router.get('/document-list', profileController.documentList)
		router.post('/help-center', profileController.helpCenter)
		router.get('/all-rides', rideController.allRides)
		router.get('/ride-details/:ride_id', rideController.rideDetails)
		router.post('/make-offer/:ride_id/:vehicle_id', rideController.makeOffer)
		router.get('/all-offers', rideController.allOffers)
		router.get('/ride-history', rideController.rideHistory)
		router.post('/leave-for-ride/:ride_id', rideController.leaveForRide)
		router.post('/at-ride-location/:ride_id', rideController.atRideLocation)
		router.post('/start-ride/:ride_id', rideController.startRide)
		router.post('/end-ride/:ride_id', rideController.endRide)
		router.post('/complete-ride/:ride_id', rideController.completeRide)
		router.post('/retry-payment/:ride_id', rideController.retryPayment)
		router.post('/cancel-ride/:ride_id', rideController.cancelRide)
		router.get('/canceled-rides', rideController.canceledRides)

	})

})

module.exports = router.init()
