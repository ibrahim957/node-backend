const config = require('../../../config')
const rides = require('../../../models/mobile/rideModel')
const drivers = require('../../../models/mobile/driverModel')
const riders = require('../../../models/mobile/riderModel')
const payments = require('../../../models/mobile/paymentModel')
const functions = require('../../../helpers/functions')
const stripe = require('stripe')(config.stripeSecret)

const stripeRefreshUrl = async(req,res)=>{

	const accountLink = await stripe.accountLinks.create({
		account: req.params.id,
		refresh_url: config.hostUrl+'/api/payments/stripe-refresh-url/'+req.params.id,
		return_url: config.hostUrl+'/api/payments/stripe-return-url',
		type: 'account_onboarding',
	})

	return res.redirect(accountLink.url)
}

const stripeReturnUrl = async(req,res)=>{
	return res.redirect(`rydelinx://deeplinks/documents_main_page`)
}

module.exports = {
	stripeRefreshUrl,
	stripeReturnUrl,
}
