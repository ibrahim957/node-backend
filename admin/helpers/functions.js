const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const aws = require('aws-sdk')
const axios = require('axios')
const bluebird = require('bluebird')
const crypto = require('crypto')
const path = require('path')
const { encode } = require ('@googlemaps/polyline-codec')

const config = require('../config')

const twilio = require('twilio')
const rides = require('../models/mobile/rideModel')
const drivers = require('../models/mobile/driverModel')
const riders = require('../models/mobile/riderModel')
const payments = require('../models/mobile/paymentModel')

const client = new twilio(config.twilioAccountSid,config.twilioAuthToken)
const stripe = require('stripe')(config.stripeSecret)


module.exports.calculateTollFee = async function calculateTollFee(polyline,path){

	polyline = encode(polyline, 5)

	return axios({
		method: 'post',
		url: 'https://dev.tollguru.com/v1/calc/route',
		headers: {'content-type': 'application/json','x-api-key': config.toll_guru_api_key},
		data: {
			source: 'gmaps',
			polyline: polyline,
			path: path,
			vehicleType: '2AxlesAuto',
		}
	})

}

module.exports.calculateDirectDistance = function calculateDistance(lat1, lng1, lat2, lng2) {

	if ((lat1 === lat2) && (lng1 === lng2)) {
		return 0
	}

	else {

		const radLat1 = Math.PI * lat1/180
		const radLat2 = Math.PI * lat2/180
		const theta = lng1-lng2
		const radTheta = Math.PI * theta/180
		let dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta)
		if (dist > 1) dist = 1
		dist = Math.acos(dist)
		dist = dist * 180/Math.PI
		dist = dist * 60 * 1.1515
		return dist

	}

}

module.exports.calculateRoadVariables = async function calculateRoadVariables(lat1, lng1, lat2, lng2) {

	let res
	await axios({
		method: 'get',
		url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat1}%2C${lng1}&destinations=${lat2}%2C${lng2}&units=imperial&key=${config.googleApiKey}`
	})
		.then((response) => {
			res = response.data
		})
		.catch((error) => {
			console.log('error')
			throw new Error(error)
		})

	return res

}
module.exports.calculateCityState = async function calculateCityState(code,country) {

	let res
	await axios({
		method: 'get',
		url: `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${code}|country:${country}&key=${config.googleApiKey}`
	})
		.then((response) => {
			res = response.data.results
		})
		.catch((error) => {
			console.log('error')
			throw new Error(error)
		})

	return res

}

module.exports.calculateLatLng = async function calculateLatLng(location) {

	let res

	await axios({
		method: 'get',
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${config.googleApiKey}`
	})
		.then((response) => {
			res = response.data.results[0].geometry.location
		})
		.catch((error) => {
			throw new Error(error)
		})

	return res

}

module.exports.sendEmail = async function sendEmail(from, to, subject, userName, emailBody, file) {

	let transporter = nodemailer.createTransport({
		host: config.nodemailerHost,
		port: 2525,
		auth: {
			user: config.nodemailerUser,
			pass: config.nodemailerPass
		},
		tls:{
			rejectUnauthorized : false
		}
	})

	const handlebarOptions = {
		viewEngine: {
			partialsDir: path.resolve('./views/'),
			defaultLayout: false
		},
		viewPath: path.resolve('./views/')
	}

	transporter.use('compile', hbs(handlebarOptions))

	let mailOptions

	if(file) {

		mailOptions = {
			from: from,
			to: to,
			subject: subject,
			template: 'email',
			context: {
				userName: userName,
				emailBody: emailBody
			},
			attachments: [{
				filename: 'logo.png',
				path: __dirname + '/../assets/images/logo.png',
				cid: 'logo' //same cid value as in the html img src
			},
				{
					filename: file.filename,
					path: file.path,
					cid: 'image'
				}
			]
		}
	}else{
		mailOptions = {
			from: from,
			to: to,
			subject: subject,
			template: 'email',
			context: {
				userName: userName,
				emailBody: emailBody
			},
			attachments: [{
				filename: 'logo.png',
				path: __dirname + '/../assets/images/logo.png',
				cid: 'logo' //same cid value as in the html img src
			}]
		}
	}
	await transporter.sendMail(mailOptions, function (error, response) {

		if (error) {
			throw new Error(error)
		} else {
			return response
		}

	})

}

module.exports.sendSms = async function sendSms(to, body) {

	// await client.messages.create({
	// 	body: body,
	// 	to: '+923218485696',
	// 	messagingServiceSid: config.twilioFrom,
	// }).then((response) => {
	// 	console.log(response)
	// 	return response
	// }).catch((error) => {
	// 	console.log(error)
	// 	throw new Error(error)
	// })
}

module.exports.uploadImage = async function uploadImage(base64Image) {

	aws.config.setPromisesDependency(bluebird)
	aws.config.update({
		accessKeyId: config.awsAccessKeyId,
		secretAccessKey: config.awsSecretAccessKey,
		region: config.awsDefaultRegion
	})

	const s3 = new aws.S3()

	const base64Data = new Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ''), 'base64')

	const type = base64Image.split(';')[0].split('/')[1]

	const key = config.s3Dir + '/' + crypto.randomBytes(20).toString('hex') + '.' + type

	const params = {
		Bucket: config.s3Bucket,
		Key: key,
		Body: base64Data,
		ACL: 'public-read',
		ContentEncoding: 'base64',
		ContentType: 'image/' + type
	}

	try {

		const { Location } = await s3.upload(params).promise()
		return Location

	} catch (error) {
		throw new Error(error)
	}

}

module.exports.checkRideValidity = async function checkRideValidity(prev_rides, ride_type, pick_up_at, pick_up_lat, pick_up_lng, drop_off_lat, drop_off_lng, no_of_hours) {

	let durObj={
		duration:0,
		availability:false,
		reason:'time'
	}

	for (const [key, value] of Object.entries(prev_rides)) {

		let endTime = new Date()

		if(value.pick_up_at.getTime() === pick_up_at.getTime()){
			return durObj
		}

		else if(value.pick_up_at.getTime() > pick_up_at.getTime()) {

			if(ride_type === 'luxury') {
				endTime.setTime(pick_up_at.getTime() + (no_of_hours * 60 * 60 * 1000))
				if(durObj.duration===0){
					durObj.duration = no_of_hours * 60 * 60 * 1000
				}
			}
			else{
				await this.calculateRoadVariables(pick_up_lat, pick_up_lng, drop_off_lat, drop_off_lng).then((response) => {
					if(response.rows[0].elements[0].status === 'NOT_FOUND' || response.rows[0].elements[0].status === 'ZERO_RESULTS'){
						durObj.reason='dropOff'
						return durObj
					}
					endTime.setTime(pick_up_at.getTime() + (response.rows[0].elements[0].duration.value*1000))
					if(durObj.duration===0){
						durObj.duration+=(response.rows[0].elements[0].duration.value)
					}
				})
			}

			if(value.pick_up_at.getTime() <= endTime.getTime()) {
				return durObj
			}
		}

		else if(value.pick_up_at.getTime() < pick_up_at.getTime()){

			if(value.ride_type === 'luxury') {
				endTime.setTime(value.pick_up_at.getTime() + (no_of_hours * 60 * 60 * 1000))
				if(durObj.duration===0){
					durObj.duration = no_of_hours * 60 * 60 * 1000
				}
			}
			else{
				await this.calculateRoadVariables(value.pick_up_location.coordinates[1], value.pick_up_location.coordinates[0],value.drop_off_location.coordinates[1], value.drop_off_location.coordinates[0]).then((response) => {
					if(response.rows[0].elements[0].status === 'NOT_FOUND' || response.rows[0].elements[0].status === 'ZERO_RESULTS'){
						durObj.reason='dropOff'
						return durObj
					}
					endTime.setTime(value.pick_up_at.getTime() + (response.rows[0].elements[0].duration.value*1000))
				})
			}

			if(endTime.getTime() >= pick_up_at.getTime()) {
				return durObj
			}
		}
	}
	if(durObj.duration===0 && ride_type === 'standard'){
		await this.calculateRoadVariables(pick_up_lat, pick_up_lng, drop_off_lat, drop_off_lng).then((response) => {
			if(response.rows[0].elements[0].status === 'NOT_FOUND' || response.rows[0].elements[0].status === 'ZERO_RESULTS'){
				durObj.reason='dropOff'
				return durObj
			}
			if(durObj.duration===0){
				durObj.duration+=(response.rows[0].elements[0].duration.value)
			}
		})
	}else if(ride_type === 'luxury'){
		durObj.duration = no_of_hours * 60 * 60 * 1000
	}
	durObj.availability=true
	return durObj
}

module.exports.checkDriverAccountStatus = function checkDriverAccountStatus(driver, current, check) {


	if(check==='not_uploaded'){
		if (driver.driver_license.status.toString() === check && current !== 'driver_license')
			return false
		if (driver.insurance.commercial_insurance_status.toString() === check && driver.insurance.personal_insurance_status.toString() === check){
			if(current !=='personal_insurance' && current !== 'commercial_insurance')
				return false
			if(current === 'personal_insurance'){
				if (driver.insurance.personal_criminal_record_status.toString() === check)
					return false
				if (driver.insurance.personal_driving_record_status.toString() === check)
					return false
			}
			if(current === 'personal_criminal_record'){
				if (driver.insurance.personal_driving_record_status.toString() === check)
					return false
			}
			if(current === 'personal_driving_record'){
				if (driver.insurance.personal_criminal_record_status.toString() === check)
					return false
			}
		}
		if (driver.vehicle_information.length !== 0) {
			if (driver.vehicle_information[0].vehicle_status === check && current !== 'vehicle_information')
				return false
			if (driver.vehicle_information[0].registration_status === check && current !== 'vehicle_registration')
				return false
		} else {
			return false
		}
		if (driver.security_information.status.toString() === check && current !== 'security_information')
			return false

		return !(driver.bank_information.status.toString() === check && current !== 'bank_information')
	}
	else{
		if (driver.driver_license.status.toString() !== check && current !== 'driver_license')
			return false
		if (driver.insurance.commercial_insurance_status.toString() !== check && driver.insurance.personal_insurance_status.toString() !== check){
			if(current !=='personal_insurance' && current !== 'commercial_insurance')
				return false
			if(current === 'personal_insurance'){
				if (driver.insurance.personal_criminal_record_status.toString() !== check)
					return false
				if (driver.insurance.personal_driving_record_status.toString() !== check)
					return false
			}
			if(current === 'personal_criminal_record'){
				if (driver.insurance.personal_driving_record_status.toString() !== check)
					return false
			}
			if(current === 'personal_driving_record'){
				if (driver.insurance.personal_criminal_record_status.toString() !== check)
					return false
			}
		}
		if (driver.vehicle_information.length !== 0) {
			if (driver.vehicle_information[0].vehicle_status !== check && current !== 'vehicle_information')
				return false
			if (driver.vehicle_information[0].registration_status !== check && current !== 'vehicle_registration')
				return false
		} else {
			return false
		}
		if (driver.security_information.status.toString() !== check && current !== 'security_information')
			return false

		return !(driver.bank_information.status.toString() !== check && current !== 'bank_information')
	}

}

module.exports.sendNotification = async function sendNotification(title,body,deviceToken) {

	if(title !== null && body !== null && deviceToken !== null ){
		return axios({
			method: 'post',
			url: 'https://fcm.googleapis.com/fcm/send',
			headers: {'Authorization': `key=${config.fcmServerKey}`, 'Content-Type': 'application/json'},
			data: {
				'to' : deviceToken,
				collapse_key : 'New Message',
				priority: 'high',
				notification : {
					'title': title,
					'body' : body,
					'sound':'default'
				}
			}
		})
	}
}

module.exports.validateEmail = async function validateEmail (emailAddress)
{
	let regexEmail = /^\w+(-?\w+)*@\w+(-?\w+)*(\.\w{2,3})+$/
	return emailAddress.match(regexEmail)
}

module.exports.validatePassword = async function validatePassword (password)
{
	let regexPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})')
	return regexPassword.test(password)
}

module.exports.payment = async function payment (id) {

	const ride = await rides.findById(id)

	if(!ride){
		return 'Ride not found'
	}

	let status

	if (ride.status === 'Ride ended' || ride.status === 'completed') {

		if (ride.canceled) {
			return ('Ride Canceled')
		}

		if (ride.payment_status === 'payment-received') {
			return ('Payment already received')
		}

		const driver = await drivers.findById(ride.driver_id)
		const rider = await riders.findById(ride.rider_id)

		if (!driver.bank_information.bankId) {
			return ('Driver bank information required')
		} else if (driver.status !== 'verified') {
			await stripe.accounts.retrieve(
				driver.bank_information.bankId
			).then(async (response) => {
				if (response.charges_enabled !== false && response.capabilities.transfers === 'active') {
					driver.bank_information.status = 'verified'
					driver.bank_information.verified_at = new Date()
					await driver.save()
				} else {
					status = 'Driver bank information required'
				}
			})
		}

		if (status === 'Driver bank information required') {
			return status
		}

		if (!rider.customer_id) {
			return ('Rider payment information required')
		}

		let amount = ride.fare
		if (ride.ride_type !== 'standard')
			amount = amount * ride.no_of_hours

		if (!driver.insurance.insurance_fee) {
			await stripe.charges.create({
				amount: amount * 100,
				currency: 'usd',
				application_fee_amount: amount * 10,
				customer: rider.customer_id,
				transfer_data: {
					destination: driver.bank_information.bankId,
				}
			}).then(async (response) => {

				if (response.status === 'succeeded') {

					await payments.create({
						rider_id: rider._id,
						transaction_id: response.balance_transaction,
						transfer_id: response.transfer,
						charge_id: response.id,
						driver_id: driver._id,
						ride_id: ride._id,
						ride_type: ride.ride_type,
						rider_card_last4: response.payment_method_details.card.last4,
						rider_card_brand: response.payment_method_details.card.brand,
						price: response.amount / 100,
						commission: response.amount / 500,
						stripe_fee: (((response.amount / 10000) * 2.9) + .30),
						driver_funds: (response.amount / 100) - (response.amount / 500) - (((response.amount / 10000) * 2.9) + .30),
						status: 'payment-received',
						transaction_date: new Date()
					}).then(async () => {

						ride.payment_status = 'payment-received'
						ride.receipt.base_fare = response.amount / 100
						ride.receipt.rydelinx_cut = response.amount / 500
						ride.receipt.total = response.amount / 100
						await ride.save()

						status = 'Payment charged successfully'
					})
				} else {
					status = 'Payment not charged'
				}
			}).catch((err) => {
				status = err
			})
		} else {
			await stripe.charges.create({
				amount: amount * 100,
				currency: 'usd',
				application_fee_amount: amount * 20,
				customer: rider.customer_id,
				transfer_data: {
					destination: driver.bank_information.bankId,
				}
			}).then(async (response) => {

				if (response.status === 'succeeded') {

					await payments.create({
						insurance_fee: true,
						rider_id: rider._id,
						transaction_id: response.balance_transaction,
						transfer_id: response.transfer,
						charge_id: response.id,
						driver_id: driver._id,
						ride_id: ride._id,
						ride_type: ride.ride_type,
						rider_card_last4: response.payment_method_details.card.last4,
						rider_card_brand: response.payment_method_details.card.brand,
						price: response.amount / 100,
						commission: response.amount / 1000,
						stripe_fee: (((response.amount / 10000) * 2.9) + .30),
						driver_funds: (response.amount / 100) - (response.amount / 1000) - (((response.amount / 10000) * 2.9) + .30),
						status: 'payment-received',
						transaction_date: new Date()
					}).then(async () => {

						ride.payment_status = 'payment-received'
						ride.receipt.base_fare = response.amount / 100
						ride.receipt.rydelinx_cut = response.amount / 1000
						ride.receipt.total = response.amount / 100
						await ride.save()

						status = 'Payment charged successfully'
					})
				} else {
					status = 'Payment not charged'
				}
			}).catch((err) => {
				status = err
			})
		}
	} else {
		return ('Ride not completed yet')
	}
	return status
}

module.exports.cancellationChargesRider = async function cancellationCharges (id) {

	const ride = await rides.findById(id)

	if(!ride){
		return 'Ride not found'
	}

	let status

	if (ride.canceled && ride.canceledBy === 'rider') {

		if (ride.cancel_charges_status === 'charged') {
			return 'Cancellation charges already received'
		}

		const driver = await drivers.findById(ride.driver_id)
		const rider = await riders.findById(ride.rider_id)

		if (!driver.bank_information.bankId) {
			return 'Driver bank information required'
		} else if (driver.status !== 'verified') {
			await stripe.accounts.retrieve(
				driver.bank_information.bankId
			).then(async (response) => {
				if (response.charges_enabled !== false && response.capabilities.transfers === 'active') {
					driver.bank_information.status = 'verified'
					driver.bank_information.verified_at = new Date()
					await driver.save()
				} else {
					status = 'Driver bank information required'
				}
			})
		}

		if (status === 'Driver bank information required') {
			return status
		}

		if (!rider.customer_id) {
			return 'Rider payment information required'
		}

		if (!driver.insurance.insurance_fee) {
			await stripe.charges.create({
				amount: ride.fare * 100,
				currency: 'usd',
				application_fee_amount: ride.fare * 10,
				customer: rider.customer_id,
				transfer_data: {
					destination: driver.bank_information.bankId,
				}
			}).then(async (response) => {

				if (response.status === 'succeeded') {

					await payments.create({
						rider_id: rider._id,
						transaction_id: response.balance_transaction,
						transfer_id: response.transfer,
						charge_id: response.id,
						driver_id: driver._id,
						ride_id: ride._id,
						ride_type: ride.ride_type,
						payment_type: 'cancellation',
						rider_card_last4: response.payment_method_details.card.last4,
						rider_card_brand: response.payment_method_details.card.brand,
						price: response.amount / 100,
						commission: response.amount / 1000,
						stripe_fee: (((response.amount / 10000) * 2.9) + .30),
						driver_funds: (response.amount / 100) - (response.amount / 1000) - (((response.amount / 10000) * 2.9) + .30),
						status: 'payment-received',
						transaction_date: new Date()
					}).then(async()=>{
						ride.cancel_charges_status = 'charged'
						ride.cancel_charges = response.amount/100
						await ride.save()

						status = 'Cancellation charged successfully'
					})
				} else {
					status = 'Cancellation not charged'
				}
			}).catch((err) => {
				status = err
			})
		} else {
			await stripe.charges.create({
				amount: ride.fare * 100,
				currency: 'usd',
				application_fee_amount: ride.fare * 20,
				customer: rider.customer_id,
				transfer_data: {
					destination: driver.bank_information.bankId,
				}
			}).then(async (response) => {

				if (response.status === 'succeeded') {

					await payments.create({
						insurance_fee: true,
						rider_id: rider._id,
						transaction_id: response.balance_transaction,
						transfer_id: response.transfer,
						charge_id: response.id,
						driver_id: driver._id,
						ride_id: ride._id,
						ride_type: ride.ride_type,
						payment_type: 'cancellation',
						rider_card_last4: response.payment_method_details.card.last4,
						rider_card_brand: response.payment_method_details.card.brand,
						price: response.amount / 100,
						commission: response.amount / 500,
						stripe_fee: (((response.amount / 10000) * 2.9) + .30),
						driver_funds: (response.amount / 100) - (response.amount / 500) - (((response.amount / 10000) * 2.9) + .30),
						status: 'payment-received',
						transaction_date: new Date()
					}).then(async()=>{
						ride.cancel_charges_status = 'charged'
						await ride.save()

						status = 'Cancellation charged successfully'
					})
				} else {
					status = 'Cancellation not charged'
				}
			}).catch((err) => {
				status = err
			})
		}
	} else {
		return 'Ride not canceled or canceled by driver'
	}
}

module.exports.tip = async function tip (id , tip) {

	const ride = await rides.findById(id)

	if (!ride) {
		return 'Ride not found'
	}

	let status

	if (ride.status === 'Ride ended' || ride.status === 'completed') {

		if (ride.canceled) {
			return ('Ride Canceled')
		}

		if (ride.receipt.tip === 0) {
			return ('Tip already received')
		}

		const driver = await drivers.findById(ride.driver_id)
		const rider = await riders.findById(ride.rider_id)

		if (!driver.bank_information.bankId) {
			return ('Driver bank information required')
		} else if (driver.status !== 'verified') {
			await stripe.accounts.retrieve(
				driver.bank_information.bankId
			).then(async (response) => {
				if (response.charges_enabled !== false && response.capabilities.transfers === 'active') {
					driver.bank_information.status = 'verified'
					driver.bank_information.verified_at = new Date()
					await driver.save()
				} else {
					status = 'Driver bank information required'
				}
			})
		}

		if (status === 'Driver bank information required') {
			return status
		}

		if (!rider.customer_id) {
			return ('Rider payment information required')
		}

		await stripe.charges.create({
			amount: tip * 100,
			currency: 'usd',
			customer: rider.customer_id,
			transfer_data: {
				destination: driver.bank_information.bankId,
			}
		}).then(async (response) => {

			if (response.status === 'succeeded') {

				await payments.create({
					insurance_fee: true,
					rider_id: rider._id,
					transaction_id: response.balance_transaction,
					transfer_id: response.transfer,
					charge_id: response.id,
					driver_id: driver._id,
					ride_id: ride._id,
					ride_type: ride.ride_type,
					payment_type: 'tip',
					rider_card_last4: response.payment_method_details.card.last4,
					rider_card_brand: response.payment_method_details.card.brand,
					price: response.amount / 100,
					commission: 0,
					stripe_fee: (((response.amount / 10000) * 2.9) + .30),
					driver_funds: (response.amount / 100) - (((response.amount / 10000) * 2.9) + .30),
					status: 'payment-received',
					transaction_date: new Date()
				}).then(async () => {

					ride.receipt.tip = response.amount / 100
					await ride.save()

					status = 'Payment charged successfully'
				})
			} else {
				status = 'Payment not charged'
			}
		}).catch((err) => {
			status = err
		})
	} else {
		return ('Ride not completed yet')
	}
	return status
}

module.exports.refundCharge = async function refundCharge (ride_id,payment_id) {

	const ride = await rides.findById(ride_id)
	const payment = await payments.findById(payment_id)
	let status

	if (ride.status === 'Ride ended' || ride.status === 'completed') {
		if (ride.payment_status === 'payment-approved') {
			if (payment.status !== 'refunded') {
				await stripe.transfers.createReversal(
					payment.transfer_id
				).then(async () => {
					await stripe.refunds.create({
						charge: payment.charge_id,
					}).then(async () => {
						payment.status = 'refunded'
						payment.refund_date = new Date()
						ride.payment_status = 'refunded'
						await ride.save()
						await payment.save().then(() => {
							status = 'success'
						})
					})
				})
				return status
			} else {
				return ('payment already refunded')
			}
		} else {
			return ('payment not charged')
		}
	} else {
		return ('ride not completed')
	}
}

module.exports.refundCancellation = async function refundCharge (ride_id,payment_id) {

	const ride = await rides.findById(ride_id)
	const payment = await payments.findById(payment_id)
	let status

	if (ride.canceled) {
		if (ride.cancel_charges_status === null || ride.cancel_charges_status === 'charged') {
			if(payment.payment_type === 'cancellation') {
				if (payment.status !== 'refunded') {
					await stripe.transfers.createReversal(
						payment.transfer_id
					).then(async () => {
						await stripe.refunds.create({
							charge: payment.charge_id,
						}).then(async () => {
							payment.status = 'refunded'
							payment.refund_date = new Date()
							ride.cancel_charges_status = 'refunded'
							await ride.save()
							await payment.save().then(() => {
								status = 'success'
							})
						})
					})
					return status
				} else {
					return ('payment already refunded')
				}
			} else{
				return ('payment type is not canceled')
			}
		} else {
			return ('cancellation not charged')
		}
	} else {
		return ('ride not canceled')
	}
}