const jwt = require('jsonwebtoken')

const config = require('../../../config')
const riders = require('../../../models/mobile/riderModel')
const functions = require('../../../helpers/functions')

const signIn = async (req, res, next) => {

	try {

		const { phone_number, device_type } = req.body

		if (!phone_number)
			return next('Phone Number is required')

		if(!device_type)
			return next('Device Type is required')

		const verification_code = (config.nodeEnv === 'development') ? 1234 : Math.floor(1000 + Math.random() * 9000)

		let rider = await riders.findOne({ phone_number })

		if (rider) {

			const query = { phone_number }

			const update = {
				device_type,
				verification_code: verification_code
			}

			const option = { new: true }

			await riders.findOneAndUpdate(query, update, option).then(async(response) => {

				await functions.sendSms(phone_number,`Your Rydelinx verification code is ${verification_code}`)

				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Rider logged in',
					rider: response
				})

			}).catch((err) => {
				return next(err)
			})

		} else {

			const data = {
				phone_number,
				device_type,
				verification_code: verification_code
			}

			await riders.create(data).then(async(response) => {

				await functions.sendSms(phone_number,`Your Rydelinx verification code is ${verification_code}`)

				return res.status(200).send({
					status: 200,
					error: false,
					message: 'New rider created successfully',
					rider: response
				})

			}).catch((err) => {
				return next(err)
			})

		}

	} catch (err) {
		return next(err)
	}

}

const resend = async (req, res, next) => {

	try {

		const { phone_number } = req.body

		if (!phone_number) {
			return next('Phone Number is required')
		}

		const verification_code = (config.nodeEnv === 'development') ? 1234 : Math.floor(1000 + Math.random() * 9000)

		let rider = await riders.findOne({ phone_number })

		if (rider) {

			const query = { phone_number }

			const update = {
				verification_code: verification_code
			}

			const option = { new: true }

			await riders.findOneAndUpdate(query, update, option).then(async() => {

				await functions.sendSms(phone_number,`Your Rydelinx verification code is ${verification_code}`)

				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Verification code resent',
				})

			}).catch((err) => {
				return next(err)
			})

		} else {
			return next('Invalid phone number')
		}

	} catch (err) {
		return next(err)
	}

}

const verify = async (req, res, next) => {

	try {

		const { phone_number, verification_code } = req.body

		if(!phone_number) {
			return next('Phone Number is required')
		}
		if(!verification_code) {
			return next('Verification code is required')
		}

		let rider = await riders.findOne({ phone_number })

		if(rider) {

			if(rider['verification_code'] === parseInt(verification_code)) {

				const query = { phone_number }

				let update = {
					verification_code: null,
				}

				if(req.body.device_token) {
					update.device_token = req.body.device_token
				}

				const option = { new: true }

				await riders.findOneAndUpdate(query, update, option).then(() => {

					const token = jwt.sign(phone_number, config.tokenSecret)

					return res.status(200).send({
						status: 200,
						error: false,
						message: 'Verification successful',
						token: token
					})

				}).catch((err) => {
					return next(err)
				})

			} else {
				return next('Invalid verification code')
			}

		} else {
			return next('Invalid phone number')
		}

	} catch (err) {
		return next(err)
	}

}

const logOut = async (req, res, next) => {

	try{

		const phone_number = req.user

		let rider = await riders.findOne({ phone_number: phone_number })

		if(!rider) {
			return next('Rider not found')
		}

		rider.device_token = null

		rider.save().then(() => {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Rider signed out successfully'
			})

		}).catch((err) => {
			return next(err)
		})

	}catch (err) {
		return next(err)
	}
}

module.exports = {
	signIn,
	resend,
	verify,
	logOut
}