const functions = require('../../../helpers/functions')
const riders = require('../../../models/mobile/riderModel')
const supportEmails = require('../../../models/admin/supportEmailModel')
const config = require('../../../config')
const stripe = require('stripe')(config.stripeSecret);

const policy = async (req, res, next) => {

	try {

		const phone_number = req.user

		let rider = await riders.findOne({ phone_number: phone_number })

		if(!rider) {
			return next('Rider not found')
		}

		const query = { phone_number: phone_number }

		const update = {
			'status.policies_accepted': true
		}

		const option = { new: true }

		await riders.findOneAndUpdate(query, update, option).then(() => {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Rider policies accepted',
			})

		}).catch((err) => {
			return next(err)
		})

	} catch (err) {
		return next(err)
	}

}

const profile = async (req, res, next) => {

	try {

		const phone_number = req.user

		let rider = await riders.findOne({ phone_number: phone_number })

		if(!rider) {
			return next('Rider not found')
		}

		const {first_name, last_name, email_address, base64_image } = req.body

		if(!last_name) {
			return next('Last Name is required')
		}
		if(!email_address) {
			return next('Email Address is required')
		}
		if(!first_name ) {
			return next('First Name is required')
		}

		await riders.findOne({email_address:email_address.toLowerCase()}).then((response)=>{
			if(response!==null){
				return next('An account is already assigned to this Email Address')
			}
		})

		const query = { phone_number: phone_number }

		const update = {
			first_name,
			last_name,
			email_address: email_address.toLowerCase(),
			'status.user_exists': true
		}

		const option = { new: true }

		if(base64_image) {
			update.photo_url = await functions.uploadImage(base64_image)
		}

		await riders.findOneAndUpdate(query, update, option).select(['first_name','last_name','email_address','status.user_exists','photo_url']).then((response) => {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Profile added successfully',
				rider: response
			})

		}).catch((err) => {
			return next(err)
		})

	} catch (err) {
		return next(err)
	}
}

const updateProfile = async (req, res, next) => {

	try {

		const phone_number = req.user

		let rider = await riders.findOne({phone_number: phone_number})

		if (!rider) {
			return next('Driver not found')
		}

		const {first_name, last_name, email_address, base64_image} = req.body

		let update={},flag=false

		if (first_name) {
			update.first_name = first_name
		}

		if (last_name) {
			update.last_name = last_name
		}

		if (email_address) {

			if (rider.email_address !== email_address.toLowerCase()) {

				const response = await riders.findOne({email_address: email_address.toLowerCase()})

				if (response !== null) {
					return next('An account is already assigned to this Email Address')
				}
				update.email_address = email_address.toLowerCase()
				flag = true
			}
		}
		if (base64_image) {
			update.photo_url = await functions.uploadImage(base64_image)
		}

		const query = {phone_number: phone_number}

		const option = {new: true}

		await riders.findOneAndUpdate(query, update, option).select(['first_name', 'last_name', 'email_address', 'status.user_exists', 'photo_url']).then(async(response) => {

			// if(flag){
			// 	await functions.sendEmail('Rydelinx@rydelinx.com',email_address,'Welcome',first_name+last_name,'Welcome! Thank you for signing up to drive with Rydelinx. We value our drivers, we put you in charge for all pricing and scheduling of passengers. Our platform connects you with new rides everyday. We ask that you provide riders with a premium level of service that offers safer, cleaner and professional rides.')
			// }

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Profile updated successfully',
				driver: response,
			})

		}).catch((err) => {
			return next(err)
		})

	} catch (err) {
		return next(err)
	}

}

const getProfile = async (req, res, next) => {

	try {
		const phone_number = req.user

		const rider = await riders.findOne({phone_number: phone_number})

		if (!rider) {
			return next('Rider not found')
		}

		return res.status(200).send({
			status: 200,
			error: false,
			message: 'Profile Information',
			rider: {
				first_name: rider.first_name,
				last_name: rider.last_name,
				photo: rider.photo_url,
				phone_number: phone_number,
				email_address: rider.email_address,
				policies: rider.status.policies_accepted,
				completed_rides: rider.completed_rides,
				rating: rider.rating/rider.completed_rides
			},
		})
	} catch (err) {
		return next(err)
	}
}

const payment = async (req, res, next) => {

	try {

		const phone_number = req.user

		let rider = await riders.findOne({phone_number: phone_number})

		if (!rider) {
			return next('Rider not found')
		}

		const {card_holder_name, card_number, expiration_year, expiration_month, cvc} = req.body

		if (!card_holder_name) {
			return next('Card holder name is required')
		}
		if (!card_number) {
			return next('Card number is required')
		}
		if (!expiration_year) {
			return next('Expiration year is required')
		}
		if (!expiration_month) {
			return next('Expiration month is required')
		}
		if (!cvc) {
			return next('Cvc is required')
		}

		const query = {phone_number: phone_number}

		let cardData

		await stripe.tokens.create({
			card: {
				number: card_number,
				exp_month: expiration_month,
				exp_year: expiration_year,
				cvc: cvc,
			}
		}).then((response) => {
			cardData = response
		})

		let update = {
			payment_information: {
				card_type: cardData.card.brand,
				card_id: cardData.card.id,
				card_holder_name: card_holder_name,
				card_number: cardData.card.last4,
				expiration_date: new Date(expiration_year, expiration_month, 1),
				uploadedAt: new Date()
			}
		}

		if (rider.customer_id == null) {

			let resp

			await stripe.customers.create({
				email: rider.email_address ? rider.email_address : null,
				name: rider.first_name + ' ' + rider.last_name,
			}).then((response) => {
				resp = response
			})

			await stripe.customers.createSource(resp.id, {
				source: cardData.id
			})

			await riders.findOneAndUpdate(query,{customer_id : resp.id})

		}else{
			await stripe.customers.createSource(rider.customer_id, {
				source: cardData.id
			})
		}

		if (!rider.payment_information.length) {
			update.payment_information.default = true
		}

		const option = {new: true}

		await riders.findOneAndUpdate(query, {$push: update}, option).then(() => {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Payment information added successfully',
			})

		}).catch((err) => {
			return next(err)
		})

	} catch (err) {
		return next(err)
	}
}

const allPayments = async (req, res, next) =>{

	try{

		const phone_number = req.user

		await riders.find({ phone_number: phone_number }).select(['payment_information._id','payment_information.card_number','payment_information.expiration_date','payment_information.default','payment_information.card_type']).then((response) => {
			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Rider payment information',
				response: response
			})

		}).catch((err) => {
			return next(err)
		})

	}catch (err) {
		return next(err)
	}

}

const defaultPayment = async (req, res, next) => {

	try {

		const phone_number = req.user

		let rider = await riders.findOne({ phone_number: phone_number })

		if(!rider) {
			return next('Rider not found')
		}

		for (const [key, value] of Object.entries(rider.payment_information)) {

			if(value.default) {
				value.default = false
			}
			if(value.default === false && value._id.equals(req.params.payment_id)) {
				value.default = true
				await stripe.customers.update(rider.customer_id, {
					default_source:value.card_id
				})
			}

		}

		await rider.save().then(() => {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Default payment information selected successfully',
			})

		})

	}
	catch(err){
		return next(err)
	}

}

const deletePayment = async (req, res, next) => {

	try {

		const phone_number = req.user

		let rider = await riders.findOne({ phone_number: phone_number })

		if(!rider) {
			return next('Rider not found')
		}

		let card_id,flag=false

		for (const [key, value] of Object.entries(rider.payment_information)) {

			if(value._id.equals(req.params.payment_id)) {
				card_id = value.card_id
				flag=true
			}

		}
		if(!flag){
			return next('No such payment method exists')
		}
		if(rider.customer_id == null){
			return next('No customer associated with this account')
		}

		const query = { phone_number: phone_number }

		const update = {
			payment_information: {
				_id: req.params.payment_id
			}
		}

		await stripe.customers.deleteSource(rider.customer_id,card_id)

		const option = { new: true }

		await riders.findOneAndUpdate(query, { $pull: update }, option).then(() => {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Payment Information deleted successfully',
			})

		}).catch((error) => {
			return next(error)
		})

	}
	catch(err) {
		return next(err)
	}

}

const helpCenter = async (req, res, next) => {

	try {

		const phone_number = req.user

		let rider = await riders.findOne({phone_number: phone_number})

		if (!rider) {
			return next('Rider not found')
		}

		const {subject,message,rating} = req.body

		if (!subject) {
			return next('Subject is required')
		}
		if (!rating) {
			return next('rating is required')
		}
		if (!message) {
			return next('message is required')
		}

		const create ={
			email:rider.email_address,
			phone_number:rider.phone_number,
			rider_id: rider._id,
			name:rider.first_name+rider.last_name,
			subject,
			message,
			rating
		}

		await supportEmails.create(create).then((response) => {
			return res.status(200).send(response)
		}).catch((error) => {
			return res.send(error.message)
		})
	} catch (err) {
		return next(err)
	}
}

module.exports = {
	policy,
	profile,
	updateProfile,
	getProfile,
	payment,
	allPayments,
	defaultPayment,
	deletePayment,
	helpCenter
}