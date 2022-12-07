const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const func = require('../../../helpers/functions')
const config = require('../../../config')
const users = require('../../../models/admin/userModel')

const register = async(req, res, next) => {

	try {

		const { email, password } = req.body

		if(!email) return next('Email address is required')

		if(!await func.validateEmail(email)) return next('Email Address is not valid')

		if(!password) return next('Password is required')

		if(!await func.validatePassword(password)) return next('Password is not valid')

		const user = await users.findOne({ email })

		if(!user) {

			const encrypted = await bcrypt.hash(password, 10)

			const data = {
				email,
				password: encrypted,
			}

			await users.create(data).then((response) => {

				const token = jwt.sign(email, config.tokenSecret)

				return res.status(200).send({
					status: 200,
					error: false,
					message: 'User registered successfully',
					user: response,
					token : token
				})

			}).catch((error) => {
				return next(error)
			})

		} else {
			return next('User already exists')
		}

	} catch(err) {
		return next(err)
	}

}

const login = async(req, res, next) => {

	try {

		const { email, password } = req.body

		if(!password) return next('Password is required')

		if(!await func.validatePassword(password)) return next('Password is not valid')

		if(!email) return next('Email address is required')

		if(!await func.validateEmail(email)) return next('Email Address is not valid')

		const user = await users.findOne({ email })

		if(user) {

			if(await bcrypt.compare(password, user.password)) {

				const token = jwt.sign(email, config.tokenSecret)

				return res.status(200).send({
					status: 200,
					error: false,
					message: 'User logged in successfully',
					user: user,
					token: token
				})

			} else {
				return next('Invalid credentials provided')
			}

		} else {
			return next('No user found')
		}

	} catch(err) {
		return next(err)
	}

}

module.exports = {
	register,
	login,
}