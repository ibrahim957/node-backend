const { driverDefinitions } = require('./driver')

const definitions = [driverDefinitions]

const allDefinitions = (agenda) => {
	definitions.forEach((definition) => definition(agenda))
}

module.exports = { allDefinitions }