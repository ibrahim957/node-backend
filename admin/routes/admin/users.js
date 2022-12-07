const Router = require('express-group-router')

const apiKey = require('../../middleware/apiKey')
const authToken = require('../../middleware/authToken')

const authController = require('../../controllers/admin/user/authControlller')
const mainController = require('../../controllers/admin/user/mainController')
const emailController = require('../../controllers/admin/mail/supportMailController')

const multer = require('multer')
const rideController = require('../../controllers/mobile/driver/rideController')

const storage = multer.diskStorage({

	destination: function (req, file, cb) {
		cb(null,'./assets/mailAttachments')
	},
	filename: function (req, file, cb) {
		let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
		cb(null, Date.now() + ext)
	}

})

const upload = multer({ storage: storage })

const router = new Router()

router.group('/', apiKey, (router) => {

	router.post('/register', authController.register)
	router.post('/login', authController.login)
	router.post('/store-emails',emailController.storeMail)

	router.group('/', authToken, (router) => {

		router.get('/current', mainController.current)
		router.post('/send-notification',mainController.sendFcmNotification)
		router.post('/send-email',upload.single('file'), mainController.sendEmails)
		router.get('/read-emails', mainController.readMail)
		router.delete('/delete-emails/:id', mainController.deleteMail)
		router.post('/send-sms', mainController.sendSms)
		router.get('/read-sms', mainController.readSms)
		router.get('/read-user/:id', mainController.readUser)
		router.get('/read-riders', mainController.readRiders)
		router.get('/read-drivers', mainController.readDrivers)
		router.get('/read-vehicles', mainController.readDriverVehicles)
		router.get('/driver-documents/:id', mainController.driverDocumentList)
		router.post('/verify-documents/:id', mainController.verifyDriverDocument)
		router.post('/reject-documents/:id', mainController.rejectDriverDocument)
		router.post('/notify-documents/:id', mainController.notifyDocument)
		router.get('/bank-account-status/:id', mainController.checkBankAccountStatus)
		router.get('/number-of-rides-this-month', mainController.numberOfRidesThisMonth)
		router.get('/all-rides-by-month', mainController.numberOfRidesByMonth)
		router.get('/number-of-all-rides', mainController.numberOfAllRides)
		router.get('/number-of-rides-by-user', mainController.numberOfRidesByUser)
		router.get('/rides-by-users/:id', mainController.ridesByUsers)
		router.get('/read-rides', mainController.readRides)
		router.get('/read-ride-by-id/:id', mainController.readRideById)
		router.post('/read-users-by-device', mainController.readUsersByDevice)
		router.post('/cancel-rides/:id', mainController.cancelRide)
		router.post('/dismiss-driver/:id', mainController.removeDriverFromRide)
		router.post('/assign-driver/:id', mainController.addDriverToRide)
		router.get('/all-payments',mainController.getPayments)
		router.get('/payment-by-id/:id',mainController.getPaymentById)
		router.post('/refund-payment/:ride_id/:payment_id',mainController.refundPayments)
		router.post('/retry-payment/:ride_id', mainController.retryPayment)
		router.get('/get-earning',mainController.allEarnings)
		router.get('/get-earning-this-month',mainController.allEarningsThisMonth)
		router.get('/get-earning-this-week',mainController.allEarningsThisWeek)
		router.get('/get-earning-for-driver/:id',mainController.allEarningsForDriver)

		router.get('/read-support-emails',emailController.readMail)
		router.post('/delete-mail/:id',emailController.deleteMail)
		router.post('/mark-unread/:id',emailController.markUnread)
		router.post('/star-mail/:id',emailController.starMail)
		router.post('/unstar-mail/:id',emailController.unStarMail)
		router.post('/send-reply/:id',upload.single('file'),emailController.sendReply)
	})

})

module.exports = router.init()
