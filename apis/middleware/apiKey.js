const config = require('../config')

const apiKey = function (req, res, next) {

	const token = req.headers['x-api-key']

	if (!token) {

		return res.status(403).send({
			status: 403,
			error: true,
			message: 'Please provide an api key'
		})

	} else if (token !== config.apiKey) {

		return res.status(401).send({
			status: 401,
			error: true,
			message: 'Invalid api key'
		})

	} else {
		next()
	}

}

module.exports = apiKey