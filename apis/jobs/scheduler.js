const Agenda = require('agenda');
const agendaDefinitions = require('./definitions/index')
const config = require('../config')

const agenda = new Agenda({ db: { address: config.mongoUri }})

agendaDefinitions.allDefinitions(agenda);

(async function () {

	await agenda.start()

	await agenda.processEvery('1 minute', 'Send ride reminder to driver', { from:'info@rydelinx.com' })

})();