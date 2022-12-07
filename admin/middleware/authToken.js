const jwt = require('jsonwebtoken')

const config = require('../config')

const authToken = (req, res, next) => {

	let token = req.headers['authorization']

	token = token && token.split(' ')[1]

	if (!token) {

		return res.status(403).send({
			status: 403,
			error: true,
			message: 'Please provide an authentication token'
		})

	}

	jwt.verify(token, config.tokenSecret, (err, user) => {

		if (err) {

			return res.status(401).send({
				status: 401,
				error: true,
				message: 'Invalid authentication token'
			})

		}

		req.user = user
		next()

	})

}

module.exports = authToken