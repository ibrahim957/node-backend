const Router = require('express-group-router')

const apiKey = require('../../middleware/apiKey')
const fakers = require('../../faker/dataFaker')
const router = new Router()

router.group('/', apiKey, (router) => {

	router.post('/fakeDriver', fakers.driverFaker)
	router.post('/fakeRider', fakers.riderFaker)
})

module.exports = router.init()
