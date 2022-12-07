const functions = require('../../../helpers/functions')
const drivers = require('../../../models/mobile/driverModel')
const supportEmails = require('../../../models/admin/supportEmailModel')
const config = require('../../../config')
const stripe = require('stripe')(config.stripeSecret)

const policy = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		const query = {phone_number: phone_number}

		const update = {
			'status.policies_accepted': true
		}

		const option = {new: true}

		await drivers.findOneAndUpdate(query, update, option).then(() => {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Driver policies accepted'
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

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		let flag = true

		if(driver.email_address == null){
			flag = false
		}

		const {first_name, last_name, email_address, base64_image} = req.body

		if (!first_name) {
			return next('First Name is required')
		}
		if (!last_name) {
			return next('Last Name is required')
		}
		if (!email_address) {
			return next('Email Address is required')
		}

		const response =await drivers.findOne({email_address:email_address.toLowerCase()})

		if(response!==null){
			return next('An account is already assigned to this Email Address')
		}

		const query = {phone_number: phone_number}

		const update = {
			first_name,
			last_name,
			email_address:email_address.toLowerCase(),
			'status.user_exists': true
		}

		const option = {new: true}

		if (base64_image) {
			update.photo_url = await functions.uploadImage(base64_image)
		}

		await drivers.findOneAndUpdate(query, update, option).select(['first_name', 'last_name', 'email_address', 'status.user_exists', 'photo_url']).then(async(response) => {

			if(flag){
				await functions.sendEmail('Rydelinx@rydelinx.com',email_address.toLowerCase(),'Welcome',first_name+last_name,'Welcome! Thank you for signing up to drive with Rydelinx. We value our drivers, we put you in charge for all pricing and scheduling of passengers. Our platform connects you with new rides everyday. We ask that you provide riders with a premium level of service that offers safer, cleaner and professional rides.')
			}

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Profile added successfully',
				driver: response,
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

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
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

			if (driver.email_address !== email_address.toLowerCase()) {

				const response = await drivers.findOne({email_address: email_address.toLowerCase()})

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

		await drivers.findOneAndUpdate(query, update, option).select(['first_name', 'last_name', 'email_address', 'status.user_exists', 'photo_url']).then(async(response) => {

			if(flag){
				await functions.sendEmail('Rydelinx@rydelinx.com',email_address,'Welcome',first_name+last_name,'Welcome! Thank you for signing up to drive with Rydelinx. We value our drivers, we put you in charge for all pricing and scheduling of passengers. Our platform connects you with new rides everyday. We ask that you provide riders with a premium level of service that offers safer, cleaner and professional rides.')
			}

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

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		return res.status(200).send({
			status: 200,
			error: false,
			message: 'Profile Information',
			driver: {
				first_name: driver.first_name,
				last_name: driver.last_name,
				photo: driver.photo_url,
				phone_number: phone_number,
				email_address: driver.email_address,
				policies: driver.status.policies_accepted,
				completed_rides: driver.completed_rides,
				rating: driver.rating/driver.completed_rides,
				earnings: 0
			},
		})
	} catch (err) {
		return next(err)
	}
}

const driverLicense = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		const {base64_image} = req.body

		if (!base64_image) {
			return next('Please select an image to upload')
		}

		const image_url = await functions.uploadImage(base64_image)

		const query = {phone_number: phone_number}

		let update = {
			'driver_license.url': image_url,
			'driver_license.uploaded_at': new Date(),
			'driver_license.status': 'pending-approval',
			'status.account_status': 'in-complete',
			'driver_license.verified_at': null,
			'driver_license.admin_message': null
		}

		if (functions.checkDriverAccountStatus(driver, 'driver_license','not-uploaded')) {
			update = {
				'driver_license.url': image_url,
				'driver_license.uploaded_at': new Date(),
				'driver_license.status': 'pending-approval',
				'status.account_status': 'pending-approval',
				'driver_license.verified_at': null,
				'driver_license.admin_message': null
			}
		}



		const option = {new: true}

		await drivers.findOneAndUpdate(query, update, option).select(['driver_license', 'status.account_status']).then((response) => {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Driver\'s license added successfully',
				driver: response
			})

		}).catch((err) => {
			return next(err)
		})

	} catch (err) {
		return next(err)
	}

}

const commercialInsurance = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		const {base64_image} = req.body

		if (!base64_image) {
			return next('Please select Insurance image to upload')
		}

		const commercial_insurance_url = await functions.uploadImage(base64_image)

		const query = {phone_number: phone_number}

		let update = {
			'insurance.commercial_insurance_url': commercial_insurance_url,
			'insurance.commercial_insurance_uploaded_at': new Date(),
			'insurance.commercial_insurance_status': 'pending-approval',
			'status.account_status': 'in-complete',
			'insurance.commercial_insurance_verified_at': null,
			'insurance.commercial_insurance_admin_message': null
		}

		if (functions.checkDriverAccountStatus(driver, 'commercial_insurance','not-uploaded')) {
			update = {
				'insurance.commercial_insurance_url': commercial_insurance_url,
				'insurance.commercial_insurance_uploaded_at': new Date(),
				'insurance.commercial_insurance_status': 'pending-approval',
				'status.account_status': 'pending-approval',
				'insurance.commercial_insurance_verified_at': null,
				'insurance.commercial_insurance_admin_message': null
			}
		}

		const option = {new: true}

		await drivers.findOneAndUpdate(query, update, option).select(['insurance', 'status.account_status']).then((response) => {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Driver\'s Commercial Insurance added successfully',
				driver: response
			})

		}).catch((err) => {
			return next(err)
		})

	} catch (err) {
		return next(err)
	}

}

const personalInsurance = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		if(driver.insurance.commercial_insurance_status === 'pending-approval' || driver.insurance.commercial_insurance_status === 'verified'){
			return next('Commercial insurance has been uploaded')
		}

		const {base64_image} = req.body

		if (!base64_image) {
			return next('Please select Insurance image to upload')
		}

		const personal_insurance_url = await functions.uploadImage(base64_image)

		const query = {phone_number: phone_number}

		let update = {
			'insurance.personal_insurance_url': personal_insurance_url,
			'insurance.personal_insurance_uploaded_at': new Date(),
			'insurance.personal_insurance_status': 'pending-approval',
			'status.account_status': 'in-complete',
			'insurance.personal_insurance_verified_at': null,
			'insurance.personal_insurance_admin_message': null
		}

		if (functions.checkDriverAccountStatus(driver, 'personal_insurance','not-uploaded')) {
			update = {
				'insurance.personal_insurance_url': personal_insurance_url,
				'insurance.personal_insurance_uploaded_at': new Date(),
				'insurance.personal_insurance_status': 'pending-approval',
				'status.account_status': 'pending-approval',
				'insurance.personal_insurance_verified_at': null,
				'insurance.personal_insurance_admin_message': null
			}
		}

		const option = {new: true}

		await drivers.findOneAndUpdate(query, update, option).select(['insurance', 'status.account_status']).then((response) => {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Driver\'s Personal Insurance added successfully',
				driver: response
			})

		}).catch((err) => {
			return next(err)
		})

	} catch (err) {
		return next(err)
	}

}

const criminalRecord = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		if(driver.insurance.commercial_insurance_status === 'pending-approval' || driver.insurance.commercial_insurance_status === 'verified'){
			return next('Commercial insurance has been uploaded')
		}

		const {base64_image} = req.body

		if (!base64_image) {
			return next('Please select Criminal record image to upload')
		}

		const personal_criminal_record_url = await functions.uploadImage(base64_image)

		const query = {phone_number: phone_number}

		let update = {
			'insurance.personal_criminal_record_url': personal_criminal_record_url,
			'insurance.personal_criminal_record_uploaded_at': new Date(),
			'insurance.personal_criminal_record_status': 'pending-approval',
			'status.account_status': 'in-complete',
			'insurance.personal_criminal_record_verified_at': null,
			'insurance.personal_criminal_record_admin_message': null
		}

		if (functions.checkDriverAccountStatus(driver, 'personal_criminal_record','not-uploaded')) {
			update = {
				'insurance.personal_criminal_record_url': personal_criminal_record_url,
				'insurance.personal_criminal_record_uploaded_at': new Date(),
				'insurance.personal_criminal_record_status': 'pending-approval',
				'status.account_status': 'pending-approval',
				'insurance.personal_criminal_record_verified_at': null,
				'insurance.personal_criminal_record_admin_message': null
			}
		}

		const option = {new: true}

		await drivers.findOneAndUpdate(query, update, option).select(['insurance', 'status.account_status']).then((response) => {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Driver\'s Personal Criminal record added successfully',
				driver: response
			})

		}).catch((err) => {
			return next(err)
		})

	} catch (err) {
		return next(err)
	}

}

const drivingRecord = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		if(driver.insurance.commercial_insurance_status === 'pending-approval' || driver.insurance.commercial_insurance_status === 'verified'){
			return next('Commercial insurance has been uploaded')
		}

		const {base64_image} = req.body

		if (!base64_image) {
			return next('Please select Driving record image to upload')
		}

		const personal_driving_record_url = await functions.uploadImage(base64_image)

		const query = {phone_number: phone_number}

		let update = {
			'insurance.personal_driving_record_url': personal_driving_record_url,
			'insurance.personal_driving_record_uploaded_at': new Date(),
			'insurance.personal_driving_record_status': 'pending-approval',
			'status.account_status': 'in-complete',
			'insurance.personal_driving_record_verified_at': null,
			'insurance.personal_driving_record_admin_message': null
		}

		if (functions.checkDriverAccountStatus(driver, 'personal_driving_record','not-uploaded')) {
			update = {
				'insurance.personal_driving_record_url': personal_driving_record_url,
				'insurance.personal_driving_record_uploaded_at': new Date(),
				'insurance.personal_driving_record_status': 'pending-approval',
				'status.account_status': 'pending-approval',
				'insurance.personal_driving_record_verified_at': null,
				'insurance.personal_driving_record_admin_message': null
			}
		}

		const option = {new: true}

		await drivers.findOneAndUpdate(query, update, option).select(['insurance', 'status.account_status']).then((response) => {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Driver\'s Personal Driving record added successfully',
				driver: response
			})

		}).catch((err) => {
			return next(err)
		})

	} catch (err) {
		return next(err)
	}

}

const addVehicle = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		const {plate_number, make, model, year, color, type, passenger_seats, category} = req.body

		if (!plate_number) {
			return next('Plate Number of the car is required')
		}
		if (!make) {
			return next('Make of the car is required')
		}
		if (!model) {
			return next('Model of the car is required')
		}
		if (!year) {
			return next('Model year of the car is required')
		}
		if (!color) {
			return next('Color of the car is required')
		}
		if (!passenger_seats) {
			return next('Max passenger seats are required')
		}
		if (!type) {
			return next('Type of the car is required')
		}
		if (!category) {
			return next('Category of the car is required')
		}
		if (category !== 'standard' && category !== 'luxury') {
			return next('Invalid car category')
		}
		if(category === 'luxury'){
			if(!['sedan','limo','suv'].includes(type.toLowerCase())){
				return next('Car type invalid for luxury vehicles')
			}
		}

		const vehicle_id = req.params.vehicle_id

		if(vehicle_id === '0') {

			const query = {phone_number}

			let update = {
				vehicle_information: {
					plate_number: plate_number,
					make: make,
					model: model,
					year: year,
					color: color,
					type: type.toLowerCase(),
					category: category,
					vehicle_uploaded_at: new Date(),
					vehicle_status: 'pending-approval',
					max_passenger_seats: passenger_seats
				}
			}

			let verified = false

			for (const [key, value] of Object.entries(driver.vehicle_information)) {

				if(value.vehicle_status === 'verified' && value.registration_status === 'verified'){
					verified = true
					break
				}
			}

			if(!verified) {
				if (functions.checkDriverAccountStatus(driver, 'vehicle_information', 'not-uploaded')) {
					update = {
						'status.account_status': 'pending-approval',
						vehicle_information: {
							plate_number: plate_number,
							make: make,
							model: model,
							year: year,
							color: color,
							type: type.toLowerCase(),
							category: category,
							vehicle_uploaded_at: new Date(),
							vehicle_status: 'pending-approval',
							max_passenger_seats: passenger_seats
						}
					}
				}
			}
			const option = {new: true}

			await drivers.findOneAndUpdate(query, {$push: update}, option).select(['vehicle_information', 'status.account_status']).then((response) => {

				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Driver\'s vehicle information added successfully',
					driver: response
				})

			}).catch((err) => {
				return next(err)
			})
		}
		else{

			let flag =0,verified=false

			for (const [key, value] of Object.entries(driver.vehicle_information)) {

				if (value._id.equals(vehicle_id)) {
					value.plate_number = plate_number
					value.make = make
					value.model = model
					value.year = year
					value.color = color
					value.type = type.toLowerCase()
					value.category = category
					value.vehicle_uploaded_at = new Date()
					value.max_passenger_seats = passenger_seats
					value.vehicle_status = 'pending-approval'
					flag=1
					break
				}
				else{
					if(value.vehicle_status === 'verified' && value.registration_status === 'verified'){
						verified = true
					}
				}
			}

			if(flag===0)
				return next('Vehicle id invalid')

			if (functions.checkDriverAccountStatus(driver, 'vehicle_information','not-uploaded')) {
				if(!verified)
				driver.status.account_status = 'pending-approval'
			}

			driver.save().then(() => {

				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Driver\'s vehicle information added successfully'
				})

			}).catch((err) => {
				return next(err)
			})
		}

	} catch (err) {
		return next(err)
	}

}

const deleteVehicle = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({ phone_number: phone_number })

		if(!driver) {
			return next('Driver not found')
		}

		const query = { phone_number: phone_number }

		let update = {
			vehicle_information: {
				_id: req.params.vehicle_id
			}
		}

		let verified = false

		for (const [key, value] of Object.entries(driver.vehicle_information)) {

			if (!value._id.equals(req.params.vehicle_id)) {
				if (value.vehicle_status === 'verified' && value.registration_status === 'verified') {
					verified = true
					break
				}
			}
		}

		if(!verified){
			let update = {
				'status.account_status': 'pending-approval',
				vehicle_information: {
					_id: req.params.vehicle_id
				}
			}
		}

		const option = { new: true }

		await drivers.findOneAndUpdate(query, { $pull: update }, option).then(() => {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Vehicle Information deleted successfully',
			})

		}).catch((error) => {
			return next(error)
		})

	}
	catch(err) {
		return next(err)
	}

}

const allVehicles = async (req, res, next) => {

	try {

		const phone_number = req.user

		await drivers.findOne({phone_number: phone_number}).select(['vehicle_information']).then((response) => {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Driver\'s vehicle information retrieved successfully',
				driver: response
			})

		}).catch((err) => {
			return next(err)
		})

	} catch (err) {
		return next(err)
	}
}

const defaultVehicle = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		for (const [key, value] of Object.entries(driver.vehicle_information)) {
			if (value.default_vehicle) {
				value.default_vehicle = false
			}
			if (value.default_vehicle === false && value._id.equals(req.params.id)) {
				value.default_vehicle = true
			}
		}
		driver.save().then((response) => {
			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Driver\'s default vehicle added successfully',
				driver: response
			})
		})
	} catch (err) {
		return next(err)
	}
}

const vehicleRegistration = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		const {base64_image} = req.body

		const vehicle_id = req.params.vehicle_id

		if (!base64_image) {
			return next('Please select an image to upload')
		}

		const image_url = await functions.uploadImage(base64_image)

		if (vehicle_id !== '0') {

			let flag = 0, verified = false

			for (const [key, value] of Object.entries(driver.vehicle_information)) {

				if (value._id.equals(vehicle_id)) {
					value.url = image_url
					value.registration_status = 'pending-approval'
					flag = 1
					break
				}else{
					if(value.vehicle_status === 'verified' && value.registration_status === 'verified'){
						verified = true
					}
				}
			}

			if(flag===0)
				return next('Vehicle id invalid')

			if (functions.checkDriverAccountStatus(driver, 'vehicle_registration','not-uploaded')) {
				if(!verified)
				driver.status.account_status = 'pending-approval'
			}

			driver.save().then(() => {

				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Driver\'s vehicle registration added successfully'
				})

			}).catch((err) => {
				return next(err)
			})
		}
		else{

			const query = {phone_number}

			let update = {
				vehicle_information: {
					url : image_url,
					registration_status : 'pending-approval',
					registration_uploaded_at: new Date()
				}
			}

			let verified = false

			for (const [key, value] of Object.entries(driver.vehicle_information)) {

				if(value.vehicle_status === 'verified' && value.registration_status === 'verified'){
					verified = true
					break
				}
			}

			if(!verified) {
				if (functions.checkDriverAccountStatus(driver, 'vehicle_information', 'not-uploaded')) {
					update = {
						'status.account_status': 'pending-approval',
						vehicle_information: {
							url: image_url,
							registration_status: 'pending-approval',
							registration_uploaded_at: new Date()
						}
					}
				}
			}

			const option = {new: true}

			await drivers.findOneAndUpdate(query, {$push: update}, option).select(['vehicle_information', 'status.account_status']).then((response) => {

				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Driver\'s vehicle registration added successfully',
					driver: response
				})

			}).catch((err) => {
				return next(err)
			})


		}
	} catch (err) {
		return next(err)
	}

}

const securityInformation = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		const {ssn, tax_id} = req.body

		if (!ssn && !tax_id) {
			return next('SSN or Tax id is required')
		}

		const query = {phone_number}

		let update = {
			'security_information.ssn': ssn ? ssn : null,
			'security_information.tax_id': tax_id ? tax_id : null,
			'security_information.uploaded_at': new Date(),
			'security_information.status': 'pending-approval',
			'status.account_status': 'in-complete',
			'security_information.verified_at': null,
			'security_information.admin_message': null
		}

		if (functions.checkDriverAccountStatus(driver, 'security_information','not-uploaded')) {
			update = {
				'security_information.ssn': ssn ? ssn : null,
				'security_information.tax_id': tax_id ? tax_id : null,
				'security_information.uploaded_at': new Date(),
				'security_information.status': 'pending-approval',
				'status.account_status': 'pending-approval',
				'security_information.verified_at': null,
				'security_information.admin_message': null
			}
		}

		const option = {new: true}

		await drivers.findOneAndUpdate(query, update, option).select(['security_information', 'status.account_status']).then((response) => {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Driver\'s security information added successfully',
				driver: response
			})

		}).catch((err) => {
			return next(err)
		})

	} catch (err) {
		return next(err)
	}

}

const bankInformation = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		if (driver.bank_information.bankId) {
			await stripe.accountLinks.create({
				account: driver.bank_information.bankId,
				refresh_url: config.hostUrl + '/api/payments/stripe-refresh-url/' + driver.bank_information.bankId,
				return_url: config.hostUrl + '/api/payments/stripe-return-url',
				type: 'account_onboarding'
			}).then((response) => {
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Driver\'s Account link sent successfully',
					driver: response
				})
			}).catch((err) => {
				return next(err)
			})
		} else {
			const query = {phone_number}

			await stripe.accounts.create({type: 'express'}).then(async (response) => {
				let update = {
					'bank_information.bankId': response.id,
					'bank_information.uploaded_at': new Date(),
					'bank_information.status': 'pending-approval'
				}

				const option = {new: true}

				await drivers.findOneAndUpdate(query, update, option).then(async () => {

					await stripe.accountLinks.create({
						account: response.id,
						refresh_url: config.hostUrl + '/api/payments/stripe-refresh-url/' + response.id,
						return_url: config.hostUrl + '/api/payments/stripe-return-url',
						type: 'account_onboarding'
					}).then(async (link) => {
						return res.status(200).send({
							status: 200,
							error: false,
							message: 'Driver\'s Account link sent successfully',
							driver: link
						})
					}).catch((err) => {
						return next(err)
					})
				}).catch((err) => {
					return next(err)
				})
			}).catch((err) => {
				return next(err)
			})
		}
	} catch (err) {
		return next(err)
	}
}

const checkBankAccountStatus = async (req,res,next)=>{

	try{

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
		}

		const query = {phone_number}

		const update = {
			'bank_information.status': 'verified',
			'bank_information.verified_at': new Date()
		}

		if(!driver.bank_information.bankId){
			return next('empty')
		}

		await stripe.accounts.retrieve(
			driver.bank_information.bankId
		).then(async(response)=>{
			if(response.charges_enabled !== false && response.capabilities.transfers === 'active'){
				await drivers.findOneAndUpdate(query,update).then(()=>{
					return res.status(200).send({
						status: 200,
						error: false,
						message: 'verified'
					})
				})
			}else{
				return next('invalid')
			}
		}).catch((err)=>{
			return next(err)
		})

	} catch(err){
		return next(err)
	}
}

const documentList = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number}).select(['driver_license', 'insurance',
			'vehicle_information', 'vehicle_registration', 'security_information', 'bank_information.status'])

		if (!driver) {
			return next('Driver not found')

		} else {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'All documents',
				documents: driver
			})

		}

	} catch (err) {
		return next(err)
	}

}

const helpCenter = async (req, res, next) => {

	try {

		const phone_number = req.user

		let driver = await drivers.findOne({phone_number: phone_number})

		if (!driver) {
			return next('Driver not found')
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
			email:driver.email_address,
			phone_number:driver.phone_number,
			driver_id: driver._id,
			name:driver.first_name+driver.last_name,
			subject,
			message,
			rating
		}

		await supportEmails.create(create).then(() => {
			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Support email sent',
			})
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
	driverLicense,
	commercialInsurance,
	personalInsurance,
	criminalRecord,
	drivingRecord,
	addVehicle,
	deleteVehicle,
	allVehicles,
	defaultVehicle,
	vehicleRegistration,
	securityInformation,
	bankInformation,
	checkBankAccountStatus,
	documentList,
	helpCenter
}
