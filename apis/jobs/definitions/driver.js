const rides = require('../../models/mobile/rideModel')
const drivers = require('../../models/mobile/driverModel')
const functions = require('../../helpers/functions')

const driverDefinitions = (agenda) => {

	agenda.define(
		'Send ride reminder to driver',
		{ priority: 'high', concurrency: 1 },
		async (job) => {
			const { from } = job.attrs.data
			await rides.find({status:'scheduled',canceled:false}).then((rides) => {
				for (const [key, value] of Object.entries(rides)) {
					if(value.driver_id!= null) {
						drivers.findById(value.driver_id).then((driver) => {
							if(driver.email_address !== null) {
								if (value.pick_up_at.getTime() - new Date().getTime() >= 43200000 && value.pick_up_at.getTime() - new Date().getTime() < 43260000) {

									functions.sendEmail(from, driver.email_address, 'Ride Reminder', driver.first_name, `You have a pickup on ${new Date(value.pick_up_at)} for ${value.pick_up_address} to ${value.drop_off_address} Please have a clean car and plan to arrive 15 minutes before customer pickup. Important: All customer connection and future ride booking is only done through the Rydelinx app. No customer solitication is allowed or else we will terminate you from the app.`)
									functions.sendSms(driver.phone_number,`You have a pickup on ${new Date(value.pick_up_at)} for ${value.pick_up_address} to ${value.drop_off_address} Please have a clean car and plan to arrive 15 minutes before customer pickup. Important: All customer connection and future ride booking is only done through the Rydelinx app. No customer solitication is allowed or else we will terminate you from the app.`)
									functions.sendNotification('Ride Reminder',`You have a pickup on ${new Date(value.pick_up_at)} for ${value.pick_up_address} to ${value.drop_off_address} Please have a clean car and plan to arrive 15 minutes before customer pickup. Important: All customer connection and future ride booking is only done through the Rydelinx app. No customer solitication is allowed or else we will terminate you from the app.`,driver.device_token)

								}
								if (value.pick_up_at.getTime() - new Date().getTime() >= 10800000 && value.pick_up_at.getTime() - new Date().getTime() < 10860000) {

									functions.sendEmail(from, driver.email_address, 'Ride Reminder', driver.first_name, `You have a pickup on ${new Date(value.pick_up_at)} for ${value.pick_up_address} to ${value.drop_off_address} Please have a clean car and plan to arrive 15 minutes before customer pickup. Important: All customer connection and future ride booking is only done through the Rydelinx app. No customer solitication is allowed or else we will terminate you from the app.`)
									functions.sendSms(driver.phone_number,`You have a pickup on ${new Date(value.pick_up_at)} for ${value.pick_up_address} to ${value.drop_off_address} Please have a clean car and plan to arrive 15 minutes before customer pickup. Important: All customer connection and future ride booking is only done through the Rydelinx app. No customer solitication is allowed or else we will terminate you from the app.`)
									functions.sendNotification('Ride Reminder',`You have a pickup on ${new Date(value.pick_up_at)} for ${value.pick_up_address} to ${value.drop_off_address} Please have a clean car and plan to arrive 15 minutes before customer pickup. Important: All customer connection and future ride booking is only done through the Rydelinx app. No customer solitication is allowed or else we will terminate you from the app.`,driver.device_token)

								}
								if (value.pick_up_at.getTime() - new Date().getTime() >= 3600000 && value.pick_up_at.getTime() - new Date().getTime() < 3660000) {

									functions.sendEmail(from, driver.email_address, 'Ride Reminder', driver.first_name, `You have a pickup on ${new Date(value.pick_up_at)} for ${value.pick_up_address} to ${value.drop_off_address} Please have a clean car and plan to arrive 15 minutes before customer pickup. Important: All customer connection and future ride booking is only done through the Rydelinx app. No customer solitication is allowed or else we will terminate you from the app.`)
									functions.sendSms(driver.phone_number,`You have a pickup on ${new Date(value.pick_up_at)} for ${value.pick_up_address} to ${value.drop_off_address} Please have a clean car and plan to arrive 15 minutes before customer pickup. Important: All customer connection and future ride booking is only done through the Rydelinx app. No customer solitication is allowed or else we will terminate you from the app.`)
									functions.sendNotification('Ride Reminder',`You have a pickup on ${new Date(value.pick_up_at)} for ${value.pick_up_address} to ${value.drop_off_address} Please have a clean car and plan to arrive 15 minutes before customer pickup. Important: All customer connection and future ride booking is only done through the Rydelinx app. No customer solitication is allowed or else we will terminate you from the app.`,driver.device_token)

								}
							}
						})
					}
				}
			})
		}
	)

}

module.exports = { driverDefinitions }