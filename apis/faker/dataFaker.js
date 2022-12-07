const {faker} = require('@faker-js/faker')
const drivers = require('../models/mobile/driverModel')
const riders = require('../models/mobile/riderModel')
const ride = require('../models/mobile/rideModel')

const driverFaker = async (req, res) => {

	for (let i = 0; i < 2000; i++) {

		let first_name = faker.name.firstName()
		let last_name = faker.name.lastName()
		let phone_number = faker.phone.phoneNumber('+1##########')
		const data = {
			phone_number: phone_number,
			device_type: faker.random.word(),
			verification_code: 1234,
			first_name: first_name,
			last_name: last_name,
			email_address: faker.internet.email(first_name, last_name),
			photo_url: faker.image.imageUrl(),
			'status.user_exists': true,
			'status.policies_accepted': true,
			'status.account_status': 'complete',
			device_token:faker.random.word() ,
			'driver_license.url': faker.image.imageUrl(),
			'driver_license.status': 'uploaded',
			'driver_license.uploaded_at': new Date(),
			'insurance.url': faker.image.imageUrl(),
			'insurance.status': 'pending-approval',
			'insurance.uploaded_at': new Date(),
			'security_information.ssn': 'faker.random.word',
			'security_information.tax_id': 'faker.random.word',
			'security_information.uploaded_at': new Date(),
			'security_information.status': 'pending-approval',
			'bank_information.account_holder_name': first_name,
			'bank_information.bank_name': faker.random.word(),
			'bank_information.account_number': faker.finance.account(),
			'bank_information.routing_number': faker.random.numeric(4),
			'bank_information.uploaded_at': new Date(),
			'bank_information.status': 'pending-approval',
			vehicle_information:[{
				'plate_number': faker.vehicle.vrm(),
				'make': 'faker.vehicle.manufacturer()',
				'model': faker.vehicle.model(),
				'year': faker.random.numeric(4),
				'color': 'faker.random.word()',
				'max_passenger_seats': faker.random.numeric(),
				'type': 'standard',
				'uploaded_at': new Date(),
				'status': 'pending-approval',
				'registration_status': 'pending-approval',
				'url': faker.image.imageUrl()
			},{
				'plate_number': faker.vehicle.vrm(),
				'make': 'faker.vehicle.manufacturer()',
				'model': faker.vehicle.model(),
				'year': faker.random.numeric(4),
				'color': 'faker.random.word()',
				'max_passenger_seats': faker.random.numeric(),
				'type': 'luxury',
				'uploaded_at': new Date(),
				'status': 'pending-approval',
				'registration_status': 'pending-approval',
				'url': faker.image.imageUrl()
			}]
		}
		await drivers.create(data)

		// let temp = {
		//     'driver_license.url': faker.image.imageUrl(),
		//     'driver_license.status': 'uploaded',
		//     'driver_license.uploaded_at': new Date(),
		//     'insurance.url': faker.image.imageUrl(),
		//     'insurance.status': 'pending-approval',
		//     'insurance.uploaded_at': new Date(),
		//     'security_information.ssn': 'faker.random.word',
		//     'security_information.tax_id': 'faker.random.word',
		//     'security_information.uploaded_at': new Date(),
		//     'security_information.status': 'pending-approval',
		//     'bank_information.account_holder_name': first_name,
		//     'bank_information.bank_name': faker.random.word(),
		//     'bank_information.account_number': faker.finance.account(),
		//     'bank_information.routing_number': faker.random.numeric(4),
		//     'bank_information.uploaded_at': new Date(),
		//     'bank_information.status': 'pending-approval',
		//     vehicle_information:[{
		//         'plate_number': faker.vehicle.vrm(),
		//         'make': 'faker.vehicle.manufacturer()',
		//         'model': faker.vehicle.model(),
		//         'year': faker.random.numeric(4),
		//         'color': 'faker.random.word()',
		//         'max_passenger_seats': faker.random.numeric(),
		//         'type': 'standard',
		//         'uploaded_at': new Date(),
		//         'status': 'pending-approval',
		//         'registration_status': 'pending-approval',
		//         'url': faker.image.imageUrl()
		//     },{
		//         'plate_number': faker.vehicle.vrm(),
		//         'make': 'faker.vehicle.manufacturer()',
		//         'model': faker.vehicle.model(),
		//         'year': faker.random.numeric(4),
		//         'color': 'faker.random.word()',
		//         'max_passenger_seats': faker.random.numeric(),
		//         'type': 'luxury',
		//         'uploaded_at': new Date(),
		//         'status': 'pending-approval',
		//         'registration_status': 'pending-approval',
		//         'url': faker.image.imageUrl()
		//     }]
		// }
		// const option = { new: true }
		//
		// await drivers.findOneAndUpdate({phone_number}, temp, option).catch((err)=>{
		//     console.log(err)
		// })

		// for (let j = 0; j < 2; j++) {
		//     const update = {
		//         'vehicle_information.plate_number': faker.vehicle.vrm(),
		//         'vehicle_information.make': 'faker.vehicle.manufacturer()',
		//         'vehicle_information.model': faker.vehicle.model(),
		//         'vehicle_information.year': faker.random.numeric(4),
		//         'vehicle_information.color': 'faker.random.word()',
		//         'vehicle_information.max_passenger_seats': faker.random.numeric(),
		//         'vehicle_information.type': 'standard',
		//         'vehicle_information.uploaded_at': new Date(),
		//         'vehicle_information.status': 'pending-approval',
		//         'vehicle_information.registration_status': 'pending-approval',
		//         'vehicle_information.url': faker.image.imageUrl(),
		//     }
		//     console.log(update,typeof(update["vehicle_information.color"]),phone_number,typeof(phone_number))
		//
		//
		//
		//     await drivers.findOneAndUpdate({phone_number}, {$push: update}, option).catch((err)=>{
		//         console.log(err)
		//     })
		// }
	}
	return res.status(200).send({
		status: 200,
		error: false,
		message: 'Driver\'s fake data added successfully'
	})
}

const riderFaker = async (req, res) => {

	for (let i = 0; i < 500; i++) {

		let first_name = faker.name.firstName()
		let last_name = faker.name.lastName()
		let phone_number = faker.phone.phoneNumber('+1##########')
		const data = {
			phone_number: phone_number,
			device_type: faker.random.word(),
			verification_code: 1234,
			first_name: first_name,
			last_name: last_name,
			email_address: faker.internet.email(first_name, last_name),
			photo_url: faker.image.imageUrl(),
			'status.user_exists': true,
			'status.policies_accepted': true,
			device_token:faker.random.word(),
			payment_information:[{
				card_holder_name: first_name,
				card_number: faker.random.numeric(7),
				expiration_date: faker.date.future(6),
				cvv: faker.random.numeric(3),
			},{
				card_holder_name: first_name,
				card_number: faker.random.numeric(7),
				expiration_date: faker.date.future(6),
				cvv: faker.random.numeric(3),
			}]
		}

		const rider = await riders.create(data)

		const pick_up_lat= faker.address.latitude( 36.665499,  34.967319, 6),
			pick_up_lng= faker.address.longitude(-84.000312,  -89.737444, 6),
			drop_off_lat =faker.address.latitude( 36.665499,  34.967319, 6),
			drop_off_lng = faker.address.latitude(-84.000312,  -89.737444, 6)


		let temp = {
			rider_id:rider._id,
			ride_type: 'standard',
			pick_up_location: {
				'type': 'Point',
				'coordinates': [pick_up_lng, pick_up_lat]
			},
			drop_off_location:{
				'type': 'Point',
				'coordinates': [drop_off_lng, drop_off_lat]
			},
			pick_up_at: faker.date.future(1),
			ride_duration: faker.random.numeric(3),
			seats_required:faker.random.numeric(1,{ bannedDigits: ['5','6','7','8','9','0'] }),
			fare: faker.random.numeric(3),
			estimated_distance: faker.random.numeric(2),
			canceled: false,
			status:'pending',
		}

		await ride.create(temp)

	}
	return res.status(200).send({
		status: 200,
		error: false,
		message: 'Rider\'s  and ride fake data added successfully'
	})
}

module.exports = {
	driverFaker,
	riderFaker
}
