const swaggerJsDoc = require('swagger-jsdoc')

const config = require('./config')

const swaggerDefinition = {

	apis: ['./apis.js'],

	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Node Apis',
			version: '1.0.0',
			description: 'Rydelinx Apis using NodeJS, ExpressJS, and MongoDB'
		},
		host: config.hostUrl,
		components: {
			securitySchemes: {
				apiKeyHeader: {
					type: 'apiKey',
					name: 'x-api-key',
					in: 'header'
				},
				jwtTokenHeader: {
					type: 'http',
					scheme: 'bearer'
				}
			}
		}
	}

}

module.exports = swaggerJsDoc(swaggerDefinition)