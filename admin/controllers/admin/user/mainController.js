const functions = require('../../../helpers/functions')
const drivers = require('../../../models/mobile/driverModel')
const riders = require('../../../models/mobile/riderModel')
const rides = require('../../../models/mobile/rideModel')
const payments = require('../../../models/mobile/paymentModel')
const users = require('../../../models/admin/userModel')
const sms = require('../../../models/admin/smsModel')
const emails = require('../../../models/admin/emailModel')
const config = require('../../../config')
const stripe = require('stripe')(config.stripeSecret)


const current = async(req, res, next) => {

	try {

		const email = req.user

		let user = await users.findOne({ email: email })

		if(user) {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Current user',
				user: user
			})

		} else {
			return next('User not found')
		}

	} catch(err) {
		return next(err)
	}

}

const sendFcmNotification = async(req, res, next) => {

	try {

		const email = req.user

		let user = await users.findOne({ email: email })

		if(!user) {
			return next('User not found')
		}

		const { title, body, deviceToken } = req.body

		if(!title)
			return next('Title of notification is required')

		if(!body)
			return next('Body of notification is required')

		if(!deviceToken)
			return next('Device Token is required')

		await functions.sendNotification(title, body, deviceToken).then(() => {

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Notification sent',
			})

		}).catch((error) => {
			return next(error)
		})

	} catch(err) {
		return next(err)
	}

}

const sendEmails = async (req,res,next) => {

	try {

		const email = req.user

		let user = await users.findOne( { email: email })

		if (!user) {
			return next('user not found')
		}

		const { from, toArray, subject, message, all} = req.body

		if(!from)
			return next('From field is required')

		if(!subject)
			return next('Subject of mail is required')

		if(!message)
			return next('Body of mail is required')

		if(!toArray && !all)
			return next('Specify recipients')

		if(toArray) {

			for (const [key, value] of Object.entries(toArray)) {
				if(!await functions.validateEmail(value.email_address)) {
					continue
				}
				await functions.sendEmail(from, value.email_address, subject, value.username, message, req.file)
			}

			await emails.create({user_id:user._id,subject:subject,message:message,toArray:toArray,attachment:req.file}).then(()=>{
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Mail/s sent successfully',
				})
			})

		}
		else {

			if (all === 'drivers' || all === 'riders' || all === 'all') {
				let data

				if (all === 'drivers' || all === 'all') {

					await drivers.find().then((response) => {
						data = response
					}).catch((error) => {
						res.send(error.message)
					})

					for (const [key, value] of Object.entries(data)) {
						if (value.email_address)
							await functions.sendEmail(from, value.email_address, subject, value.first_name, message, req.file)
					}

				}


				if (all === 'riders' || all === 'all') {

					await riders.find().then((response) => {
						data = response
					}).catch((error) => {
						res.send(error.message)
					})

					for (const [key, value] of Object.entries(data)) {
						if (value.email_address)
							await functions.sendEmail(from, value.email_address, subject, value.first_name, message, req.file)
					}

				}

				await emails.create({user_id:user._id,subject:subject,message:message,all:all,attachment:req.file}).then(()=>{
					return res.status(200).send({
						status: 200,
						error: false,
						message: 'Mail/s sent successfully',
					})
				})

			} else {
				return next('Invalid recipients')
			}
		}

	} catch(err) {
		return next(err)
	}

}

const readMail = async (req, res,next) => {

	try {

		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		const {id} = req.query

		if(!id) {
			await emails.find({user_id: user._id}).then((response) => {
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Mail/s retrieved successfully',
					response: response
				})
			}).catch((error) => {
				res.send(error.message)
			})
		}else{
			await emails.find({_id: id}).then((response) => {
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Mail retrieved successfully',
					response: response
				})
			}).catch((error) => {
				res.send(error.message)
			})
		}
	} catch(err) {
		return next(err)
	}
}

const deleteMail = async (req, res,next) => {

	try {

		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		if(req.params.id) {
			await emails.deleteOne({_id: req.params.id}).then(() => {
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Mail deleted successfully'
				})
			}).catch((error) => {
				res.send(error.message)
			})
		}else{
			return next('Id of mail required')
		}
	} catch(err) {
		return next(err)
	}
}

const sendSms = async (req,res,next) => {

	try{

		const email = req.user

		let user = await users.findOne( { email: email })

		if (!user) {
			return next('user not found')
		}

		const {toArray, message, all} = req.body

		if(!message)
			return next('Message required')

		if(!toArray && !all)
			return next('Specify recipients')

		if(toArray) {

			for (const [key, value] of Object.entries(toArray)) {
				await functions.sendSms(value.phone_number,message)
			}

			await sms.create({user_id:user._id,message:message,toArray:toArray}).then(()=>{
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Sms/s sent successfully',
				})
			})

		}

		else {

			if(all==='drivers' ||all==='riders' ||all==='all'){

				let data

				if (all === 'drivers' || all === 'all') {

					await drivers.find().then((response) => {
						data = response
					}).catch((error) => {
						res.send(error.message)
					})

					for (const [key, value] of Object.entries(data)) {
						await functions.sendSms(value.phone_number, message)
					}
				}

				if (all === 'riders' || all === 'all') {

					await riders.find().then((response) => {
						data = response
					}).catch((error) => {
						res.send(error.message)
					})

					for (const [key, value] of Object.entries(data)) {
						await functions.sendSms(value.phone_number, message)
					}
				}

				await sms.create({user_id:user._id,message:message,all:all}).then(()=>{
					return res.status(200).send({
						status: 200,
						error: false,
						message: 'Sms/s sent successfully',
					})
				})

			} else {
				return next('Invalid recipients')
			}

		}
	} catch(err) {
		return next(err)
	}

}

const readSms = async (req, res,next) => {

	try {

		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		const {id} = req.query

		if(!id) {
			await sms.find({user_id: user._id}).then((response) => {
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Sms/s retrieved successfully',
					response: response
				})
			}).catch((error) => {
				res.send(error.message)
			})
		}else{
			await sms.find({_id: id}).then((response) => {
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Sms retrieved successfully',
					response: response
				})
			}).catch((error) => {
				res.send(error.message)
			})
		}
	} catch(err) {
		return next(err)
	}
}

const readRiders = async (req, res,next) => {

	try {

		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		await riders.find().then((response) => {
			res.send(response)
		}).catch((error) => {
			res.send(error.message)
		})

	} catch(err) {
		return next(err)
	}

}

const readUser = async (req, res,next) => {

	try {

		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		const {userType} = req.query

		if(!userType){
			return next('Type of user is required')
		}

		if(userType === 'rider') {
			await riders.findById(req.params.id).then((response) => {
				res.send(response)
			}).catch((error) => {
				res.send(error.message)
			})
		}
		else if(userType === 'driver'){
			await drivers.findById(req.params.id).then((response) => {
				res.send(response)
			}).catch((error) => {
				res.send(error.message)
			})
		}
		else{
			return next('Invalid user type')
		}
	} catch(err) {
		return next(err)
	}

}

const readDrivers = async (req, res,next) => {

	try {
		const email = req.user

		let user = await users.findOne( { email: email })

		if (!user) {
			return next('user not found')
		}

		await drivers.find().then((response) => {
			res.send(response)
		}).catch((error) => {
			res.send(error.message)
		})

	}catch(err){
		return next(err)
	}

}

const readDriverVehicles = async (req, res,next) => {

	try {
		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		const {phone_number,driver_id} = req.query

		let driver

		if (driver_id) {
			driver = await drivers.findById(driver_id)
			if (driver) {
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Driver Vehicles',
					response: driver.vehicle_information
				})
			} else {
				return next('Driver does not exist')
			}
		} else if (phone_number) {
			driver = await drivers.findOne({phone_number: phone_number})
			if (driver) {
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Driver Vehicles',
					response: driver.vehicle_information
				})
			} else {
				return next('Driver does not exist')
			}
		} else {
			return next('Id or Phone Number required')
		}
	} catch (err) {
		return next(err)
	}

}

const driverDocumentList = async (req, res, next) => {

	try {

		const email = req.user

		let user = await users.findOne( { email: email })

		if (!user) {
			return next('user not found')
		}

		let driver = await drivers.findById(req.params.id).select(['driver_license', 'insurance',
			'vehicle_information', 'vehicle_registration', 'security_information', 'bank_information'])

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

const verifyDriverDocument = async (req,res,next)=> {

	try {
		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		let driver = await drivers.findById(req.params.id)

		const {document, vehicle_id} = req.body

		if (!document) {
			return next('Document Name Required')
		}
		let arr = ['driver_license','commercial_insurance','personal_criminal_record','personal_insurance','personal_driving_record','vehicle_information','vehicle_registration','security_information']

		if(!arr.includes(document)){
			return next('Invalid document name')
		}

		if(functions.checkDriverAccountStatus(driver,document,'verified')){
			driver.status.account_status = 'verified'
		}

		if (document === 'driver_license') {

			driver.driver_license.status ='verified'
			driver.driver_license.verified_at = new Date()

			driver.save().then(() => {
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Driver\'s License verified successfully'
				})
			})
		} else if (document === 'commercial_insurance') {

			driver.insurance.commercial_insurance_status ='verified'
			driver.insurance.commercial_insurance_verified_at = new Date()
			driver.insurance.insurance_fee = false

			driver.save().then(() => {
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Driver\'s Commercial Insurance verified successfully'
				})
			})
		} else if (document === 'personal_criminal_record') {

			driver.insurance.personal_criminal_record_status ='verified'
			driver.insurance.personal_criminal_record_verified_at = new Date()
			if(driver.insurance.personal_driving_record_status === 'verified' || driver.insurance.personal_insurance_status === 'verified'){
				driver.insurance.insurance_fee = true
			}

			driver.save().then(() => {
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Driver\'s Personal Criminal Record verified successfully'
				})
			})
		} else if (document === 'personal_insurance') {

			driver.insurance.personal_insurance_status ='verified'
			driver.insurance.personal_insurance_verified_at = new Date()

			if(driver.insurance.personal_criminal_record_status === 'verified' || driver.insurance.personal_driving_record_status === 'verified'){
				driver.insurance.insurance_fee = true
			}

			driver.save().then(() => {
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Driver\'s Personal Insurance verified successfully'
				})
			})
		} else if (document === 'personal_driving_record') {

			driver.insurance.personal_driving_record_status ='verified'
			driver.insurance.personal_driving_record_verified_at = new Date()

			if(driver.insurance.personal_criminal_record_status === 'verified' || driver.insurance.personal_insurance_status === 'verified'){
				driver.insurance.insurance_fee = true
			}

			driver.save().then(() => {
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Driver\'s Personal Driving Record verified successfully'
				})
			})
		} else if (document === 'vehicle_information') {

			if (!vehicle_id) {
				return next('Vehicle Id is Required')
			}

			for (const [key, value] of Object.entries(driver.vehicle_information)) {

				if (value._id.equals(vehicle_id)) {
					value.vehicle_status = 'verified'
					value.vehicle_verified_at = new Date()
					break
				}
			}
			driver.save().then(() => {

				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Driver\'s Vehicle Information verified successfully'
				})
			})
		} else if (document === 'vehicle_registration') {

			if (!vehicle_id) {
				return next('Vehicle Id is Required')
			}

			for (const [key, value] of Object.entries(driver.vehicle_information)) {

				if (value._id.equals(vehicle_id)) {
					value.registration_status = 'verified'
					value.registration_verified_at = new Date()
					break
				}
			}
			driver.save().then(() => {

				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Driver\'s Vehicle Registration verified successfully'
				})
			})
		} else if (document === 'security_information') {

			driver.security_information.status ='verified'
			driver.security_information.verified_at = new Date()

			driver.save().then(() => {
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Driver\'s Security Information verified successfully'
				})
			})
		}

	} catch (err) {
		return next(err)
	}
}

const rejectDriverDocument = async (req,res,next)=> {

	try {
		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}
		const {document, vehicle_id} = req.body

		if (!document) {
			return next('Document Name Required')
		}

		let arr = ['driver_license','commercial_insurance','personal_criminal_record','personal_insurance','personal_driving_record','vehicle_information','vehicle_registration','security_information']

		if(!arr.includes(document)){
			return next('Invalid document name')
		}

		if (document === 'driver_license') {
			drivers.findOneAndUpdate({_id: req.params.id}, {
				'driver_license.status': 'not-uploaded',
				'driver_license.verified_at': null,
				'driver_license.url': null,
				'driver_license.uploaded_at': null,
				'driver_license.admin_message': null
			}).then(async(response) => {
				await functions.sendNotification('Document Rejected',`Your driver license has been rejected. Please re-upload for verification`,response.device_token)
				await functions.sendEmail('',response.email_address,'Document Rejected',response.first_name+response.last_name,'Your driver license has been rejected. Please re-upload for verification')
				await functions.sendSms(response.phone_number,`Hello ${response.first_name} ${response.last_name}, your driver license has been rejected. Please re-upload for verification`)
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Driver\'s License Rejected successfully'
				})
			})
		} else if (document === 'commercial_insurance') {
			drivers.findOneAndUpdate({_id: req.params.id}, {
				'insurance.commercial_insurance_status': 'not-uploaded',
				'insurance.commercial_insurance_verified_at': null,
				'insurance.commercial_insurance_url': null,
				'insurance.commercial_insurance_uploaded_at': null,
				'insurance.commercial_insurance_admin_message': null
			}).then(async(response) => {
				await functions.sendNotification('Document Rejected',`Your Commercial insurance has been rejected. Please re-upload for verification`,response.device_token)
				await functions.sendEmail('',response.email_address,'Document Rejected',response.first_name+response.last_name,'Your Commercial insurance has been rejected. Please re-upload for verification')
				await functions.sendSms(response.phone_number,`Hello ${response.first_name} ${response.last_name}, your Commercial insurance has been rejected. Please re-upload for verification`)
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Driver\'s Commercial Insurance Rejected successfully'
				})
			})
		}else if (document === 'personal_criminal_record') {
			drivers.findOneAndUpdate({_id: req.params.id}, {
				'insurance.personal_criminal_record_status': 'not-uploaded',
				'insurance.personal_criminal_record_verified_at': null,
				'insurance.personal_criminal_record_url': null,
				'insurance.personal_criminal_record_uploaded_at': null,
				'insurance.personal_criminal_record_admin_message': null
			}).then(async(response) => {
				await functions.sendNotification('Document Rejected',`Your Personal criminal record has been rejected. Please re-upload for verification`,response.device_token)
				await functions.sendEmail('',response.email_address,'Document Rejected',response.first_name+response.last_name,'Your Personal criminal record has been rejected. Please re-upload for verification')
				await functions.sendSms(response.phone_number,`Hello ${response.first_name} ${response.last_name}, your Personal criminal record has been rejected. Please re-upload for verification`)
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Driver\'s Personal Criminal Record Rejected successfully'
				})
			})
		}else if (document === 'personal_insurance') {
			drivers.findOneAndUpdate({_id: req.params.id}, {
				'insurance.personal_insurance_status': 'not-uploaded',
				'insurance.personal_insurance_verified_at': null,
				'insurance.personal_insurance_url': null,
				'insurance.personal_insurance_uploaded_at': null,
				'insurance.personal_insurance_admin_message': null
			}).then(async(response) => {
				await functions.sendNotification('Document Rejected',`Your Personal insurance has been rejected. Please re-upload for verification`,response.device_token)
				await functions.sendEmail('',response.email_address,'Document Rejected',response.first_name+response.last_name,'Your Personal insurance has been rejected. Please re-upload for verification')
				await functions.sendSms(response.phone_number,`Hello ${response.first_name} ${response.last_name}, your Personal insurance has been rejected. Please re-upload for verification`)
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Driver\'s Personal Insurance Rejected successfully'
				})
			})
		}else if (document === 'personal_driving_record') {
			drivers.findOneAndUpdate({_id: req.params.id}, {
				'insurance.personal_driving_record_status': 'not-uploaded',
				'insurance.personal_driving_record_verified_at': null,
				'insurance.personal_driving_record_url': null,
				'insurance.personal_driving_record_uploaded_at': null,
				'insurance.personal_driving_record_admin_message': null
			}).then(async(response) => {
				await functions.sendNotification('Document Rejected',`Your Personal driving record has been rejected. Please re-upload for verification`,response.device_token)
				await functions.sendEmail('',response.email_address,'Document Rejected',response.first_name+response.last_name,'Your Personal driving record has been rejected. Please re-upload for verification')
				await functions.sendSms(response.phone_number,`Hello ${response.first_name} ${response.last_name}, your Personal driving record has been rejected. Please re-upload for verification`)
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Driver\'s Personal Driving Record Rejected successfully'
				})
			})
		} else if (document === 'vehicle_information') {

			if (!vehicle_id) {
				return next('Vehicle Id is Required')
			}

			let flag = true

			const driver = await drivers.findById(req.params.id)

			for (const [key, value] of Object.entries(driver.vehicle_information)) {
				if (value._id.equals(req.params.id)) {
					value.vehicle_status='rejected'
				}
				else{
					if(value.vehicle_status === 'verified' && value.registration_status === 'verified'){
						flag = false
					}
				}
			}

			if(flag){
				driver.status.account_status = 'pending-approval'
			}

			driver.save().then(async(response)=>{
				await functions.sendNotification('Vehicle Information Rejected',`Your Vehicle Information has been rejected. Please re-upload for verification`,response.device_token)
				await functions.sendEmail('',response.email_address,'Vehicle Information Rejected',response.first_name+response.last_name,'Your Vehicle Information has been rejected. Please re-upload for verification')
				await functions.sendSms(response.phone_number,`Hello ${response.first_name} ${response.last_name}, your Vehicle Information has been rejected. Please re-upload for verification`)
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Vehicle Information Rejected successfully',
				})
			})

		} else if (document === 'vehicle_registration') {

			if (!vehicle_id) {
				return next('Vehicle Id is Required')
			}
			const driver = await drivers.findById(req.params.id)

			let flag = true

			for (const [key, value] of Object.entries(driver.vehicle_information)) {
				if (value._id.equals(req.params.id)) {
					value.registration_status= 'rejected'
				}
				else{
					if(value.vehicle_status === 'verified' && value.registration_status === 'verified'){
						flag = false
					}
				}
			}

			if(flag){
				driver.status.account_status = 'pending-approval'
			}

			driver.save().then(async(response)=>{
				await functions.sendNotification('Vehicle Registration Rejected',`Your Vehicle Registration has been rejected. Please re-upload for verification`,response.device_token)
				await functions.sendEmail('',response.email_address,'Vehicle Registration Rejected',response.first_name+response.last_name,'Your Vehicle Registration has been rejected. Please re-upload for verification')
				await functions.sendSms(response.phone_number,`Hello ${response.first_name} ${response.last_name}, your Vehicle Registration has been rejected. Please re-upload for verification`)
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Vehicle Registration Rejected successfully',
				})
			})
		} else if (document === 'security_information') {
			drivers.findOneAndUpdate({_id: req.params.id}, {
				'security_information.status': 'not-uploaded',
				'security_information.verified_at': null,
				'security_information.url': null,
				'security_information.uploaded_at': null,
				'security_information.admin_message': null
			}).then(async(response) => {
				await functions.sendNotification('Document Rejected',`Your Security information has been rejected. Please re-upload for verification`,response.device_token)
				await functions.sendEmail('',response.email_address,'Document Rejected',response.first_name+response.last_name,'Your Security information has been rejected. Please re-upload for verification')
				await functions.sendSms(response.phone_number,`Hello ${response.first_name} ${response.last_name}, your Security information has been rejected. Please re-upload for verification`)
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Driver\'s Security Information Rejected successfully'
				})
			})
		}

	} catch (err) {
		return next(err)
	}
}

const notifyDocument = async (req,res,next)=> {

	try {
		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}
		const {document, vehicle_id} = req.body

		if (!document) {
			return next('Document Name Required')
		}

		let arr = ['driver_license', 'commercial_insurance', 'personal_criminal_record', 'personal_insurance', 'personal_driving_record', 'vehicle_information', 'vehicle_registration', 'security_information']

		if (!arr.includes(document)) {
			return next('Invalid document name')
		}

		const driver = await drivers.findById(req.params.id)

		if (document === 'driver_license') {
			if (driver.driver_license.status === 'pending-approval') {
				return next('Document is already uploaded')
			}
			await functions.sendNotification('Upload Document', `Your driver license has not been uploaded. Please upload for verification`, driver.device_token)
			await functions.sendEmail('', driver.email_address, 'Upload Document', driver.first_name + driver.last_name, 'Your driver license has not been uploaded. Please upload for verification')
			await functions.sendSms(driver.phone_number, `Hello ${driver.first_name} ${driver.last_name}, your driver license has not been uploaded. Please upload for verification`)
			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Driver\'s License upload notification sent successfully'
			})
		} else if (document === 'insurance') {
			if (driver.insurance.commercial_insurance_status === 'pending-approval' || driver.insurance.personal_insurance_status === 'pending-approval') {
				return next('Document is already uploaded')
			}
			await functions.sendNotification('Upload Document', `Your Insurance has not been uploaded. Please upload for verification`, driver.device_token)
			await functions.sendEmail('', driver.email_address, 'Document Rejected', driver.first_name + driver.last_name, 'Your Iommercial insurance has not been uploaded. Please upload for verification')
			await functions.sendSms(driver.phone_number, `Hello ${driver.first_name} ${driver.last_name}, Your Iommercial insurance has not been uploaded. Please upload for verification`)
			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Driver\'s Insurance upload notification sent successfully'
			})
		} else if (document === 'personal_criminal_record') {
			if (driver.insurance.personal_criminal_record_status === 'pending-approval') {
				return next('Document is already uploaded')
			}
			await functions.sendNotification('Upload Document', `Your Personal criminal record has not been uploaded. Please upload for verification`, driver.device_token)
			await functions.sendEmail('', driver.email_address, 'Document Rejected', driver.first_name + driver.last_name, 'Your Personal criminal record has not been uploaded. Please upload for verification')
			await functions.sendSms(driver.phone_number, `Hello ${driver.first_name} ${driver.last_name}, your Personal criminal record has not been uploaded. Please upload for verification`)
			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Driver\'s Personal Criminal Record upload notification sent successfully'
			})
		} else if (document === 'personal_driving_record') {
			if (driver.insurance.personal_criminal_record_status === 'pending-approval') {
				return next('Document is already uploaded')
			}
			await functions.sendNotification('Upload Document', `Your Personal driving record has not been uploaded. Please upload for verification`, driver.device_token)
			await functions.sendEmail('', driver.email_address, 'Document Rejected', driver.first_name + driver.last_name, 'Your Personal driving record has not been uploaded. Please upload for verification')
			await functions.sendSms(driver.phone_number, `Hello ${driver.first_name} ${driver.last_name}, your Personal driving record has not been uploaded. Please upload for verification`)
			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Driver\'s Personal Driving Record upload notification sent successfully'
			})
		} else if (document === 'vehicle_information') {

			if (!vehicle_id) {
				return next('Vehicle Id is Required')
			}

			let flag = false

			for (const [key, value] of Object.entries(driver.vehicle_information)) {
				if (value._id.equals(vehicle_id)) {
					if (value.vehicle_status !== 'not-uploaded') {
						flag = true
					}
					break
				}
			}
			if (flag) {
				return next('Document is already uploaded')
			}

			await functions.sendNotification('Upload Document', `Your Vehicle information has not been uploaded. Please upload for verification`, driver.device_token)
			await functions.sendEmail('', driver.email_address, 'Document Rejected', driver.first_name + driver.last_name, 'Your Vehicle information has not been uploaded. Please upload for verification')
			await functions.sendSms(driver.phone_number, `Hello ${driver.first_name} ${driver.last_name}, your Vehicle information has not been uploaded. Please upload for verification`)
			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Vehicle Information upload notification sent successfully',
			})
		} else if (document === 'vehicle_registration') {

			if (!vehicle_id) {
				return next('Vehicle Id is Required')
			}

			let flag = false

			for (const [key, value] of Object.entries(driver.vehicle_information)) {
				if (value._id.equals(vehicle_id)) {
					if (value.registration_status !== 'not-uploaded') {
						flag = true
					}
					break
				}
			}
			if (flag) {
				return next('Document is already uploaded')
			}

			await functions.sendNotification('Upload Document', `Your Vehicle registration has not been uploaded. Please upload for verification`, driver.device_token)
			await functions.sendEmail('', driver.email_address, 'Document Rejected', driver.first_name + driver.last_name, 'Your Vehicle registration has not been uploaded. Please upload for verification')
			await functions.sendSms(driver.phone_number, `Hello ${driver.first_name} ${driver.last_name}, your Vehicle registration has not been uploaded. Please upload for verification`)
			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Vehicle Registration upload notification sent successfully',
			})
		} else if (document === 'security_information') {
			if (driver.security_information.status === 'pending-approval') {
				return next('Document is already uploaded')
			}
			await functions.sendNotification('Upload Document', `Your Security information has not been uploaded. Please upload for verification`, driver.device_token)
			await functions.sendEmail('', driver.email_address, 'Document Rejected', driver.first_name + driver.last_name, 'Your Security information has not been uploaded. Please upload for verification')
			await functions.sendSms(driver.phone_number, `Hello ${driver.first_name} ${driver.last_name}, your Security information has not been uploaded. Please upload for verification`)
			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Driver\'s Security Information upload notification sent successfully'
			})
		} else if (document === 'bank_information') {
			if (driver.bank_information.status === 'pending-approval') {
				return next('Document is already uploaded')
			}
			await functions.sendNotification('Upload Document', `Your Bank information has not been uploaded. Please upload for verification`, driver.device_token)
			await functions.sendEmail('', driver.email_address, 'Document Rejected', driver.first_name + driver.last_name, 'Your Bank information has not been uploaded. Please upload for verification')
			await functions.sendSms(driver.phone_number, `Hello ${driver.first_name} ${driver.last_name}, your Bank information has not been uploaded. Please upload for verification`)
			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Driver\'s Bank Information upload notification sent successfully'
			})
		}

	} catch (err) {
		return next(err)
	}
}

const numberOfAllRides = async (req,res,next)=> {

	try{

		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		let allRides,standardRides,luxuryRides,canceledRides

		allRides = await rides.count({status: 'completed'})
		canceledRides = await rides.count({ status: 'canceled'})
		standardRides = await rides.count({status: 'completed',ride_type: 'standard'})
		luxuryRides = await rides.count({status: 'completed',ride_type: 'luxury'})

		return res.status(200).send({
			status: 200,
			error: false,
			message: 'Count of all rides ',
			response: {allRides: allRides,canceledRides:canceledRides, standardRides: standardRides, luxuryRides: luxuryRides}
		})

	} catch (err) {
		return next(err)
	}
}

const numberOfRidesByMonth = async (req,res,next) => {

	try {

		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		const {year,ride_type} = req.query

		if(!year){
			return next('Year is required')
		}
		if(!ride_type){
			return next('Ride Type is required')
		}
		if(ride_type !== 'standard' && ride_type !== 'luxury'){
			return next('Ride type is not valid')
		}

		if (year < 2022 || year > new Date().getFullYear()) {
			return next('Invalid date')
		}

		let Rides = []

		for (let i = 1; i <= 12; i++) {
			if (i !== 12) {
				Rides.push(await rides.find({
					ride_type:ride_type,
					createdAt: {
						$gte: new Date(`${year}-${i}-1`),
						$lte: new Date(`${year}-${i + 1}-1`)
					}
				}).count())
			} else {
				Rides.push(await rides.find({
					ride_type:ride_type,
					createdAt: {
						$gte: new Date(`${year}-${i}-1`),
						$lte: new Date(`${year + 1}-1-1`)
					}
				}).count())
			}
		}

		res.status(200).send({
			status: 200,
			error: false,
			message: 'Count of all rides by month',
			rides_by_month: Rides
		})

	} catch (err) {
		return next(err)
	}
}

const numberOfRidesThisMonth = async (req,res,next)=> {

	try{

		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		const ridesThisMonth = await rides.countDocuments({
			createdAt: {$gt: new Date(new Date().getTime()-2.628e+9) }
		})
		const ridesLastMonth = await rides.countDocuments({
			createdAt: {$gt: new Date(new Date().getTime()-(2.628e+9*2)), $lt: new Date(new Date().getTime()-(2.628e+9))}
		})

		const percentage = (((ridesThisMonth-ridesLastMonth)/ridesLastMonth)*100).toFixed(1)

		return res.status(200).send({
			status: 200,
			error: false,
			message: 'Count of rides this month and percentage difference from last month',
			response: {ridesThisMonth:ridesThisMonth,percentage:percentage}
		})

	}catch (err) {
		return next(err)
	}
}

const numberOfRidesByUser = async (req,res,next)=> {

	try{

		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		const {userType} = req.query

		if(!userType){
			return next('Type of user is required')
		}

		let allRides,standardRides,luxuryRides

		if (userType === 'rider') {

			allRides = await rides.count({rider_id: req.params.id, status: 'completed'})
			standardRides = await rides.count({rider_id: req.params.id, status: 'completed',ride_type: 'standard'})
			luxuryRides = await rides.count({rider_id: req.params.id, status: 'completed',ride_type: 'luxury'})

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Count of all,standard and luxury rides fpr Rider',
				response: {allRides: allRides, standardRides: standardRides, luxuryRides: luxuryRides}
			})

		}
		else if (userType === 'driver') {

			allRides = await rides.count({driver_id: req.params.id, status: 'completed'})
			standardRides = await rides.count({driver_id: req.params.id, status: 'completed',ride_type: 'standard'})
			luxuryRides = await rides.count({driver_id: req.params.id, status: 'completed',ride_type: 'luxury'})

			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Count of all,standard and luxury rides fpr Driver',
				response: {allRides: allRides, standardRides: standardRides, luxuryRides: luxuryRides}
			})

		}
		else{
			return next('User type invalid')
		}

	} catch (error) {
		return next(error)
	}
}

const ridesByUsers = async (req,res,next) => {

	try {

		const phone_number = req.user

		let user = await users.findOne({phone_number: phone_number})

		if (!user) {
			return next('User not found')
		}

		const {userType} = req.query

		if(!userType){
			return next('Type of user is required')
		}

		if (userType === 'rider') {

			await rides.find({rider_id: req.params.id}).then((response) => {

				return res.status(200).send({
					status: 200,
					error: false,
					message: 'all rides',
					rides: response
				})

			}).catch((err) => {
				return next(err)
			})
		}
		else if (userType === 'driver') {

			await rides.find({driver_id: req.params.id,}).then((response) => {

				return res.status(200).send({
					status: 200,
					error: false,
					message: 'all rides',
					rides: response
				})

			}).catch((err) => {
				return next(err)
			})
		}
		else{
			return next('User type invalid')
		}

	} catch (error) {
		return next(error)
	}
}

const readDriversByState = async (req, res,next) => {

	try {
		const email = req.user

		let user = await users.findOne( { email: email })

		if (!user) {
			return next('user not found')
		}

		const { state } = req.body

		await drivers.find().then((response) => {
			res.send(response)
		}).catch((error) => {
			res.send(error.message)
		})

	}catch(err){
		return next(err)
	}
}

const readRides = async (req,res,next) => {

	try {
		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		const {ride_type}=req.query

		if(!ride_type){
			return next('Type of ride is required')
		}

		await rides.find({ride_type: ride_type}).then((response) => {
			res.send(response)
		}).catch((error) => {
			res.send(error.message)
		})

	}catch(err){
		return next(err)
	}
}

const readRideById = async (req,res,next) => {

	try {
		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		if(!req.params.id){
			return next('Ride id is required')
		}

		await rides.findById(req.params.id).then((response) => {
			res.send(response)
		}).catch((error) => {
			res.send(error.message)
		})

	}catch(err){
		return next(err)
	}
}

const readUsersByDevice = async (req,res,next) => {

	try {

		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		const { device , user_type } = req.query
		if(!device){
			return next('Device type is required')
		}
		if(!user_type){
			return next('User type is required')
		}

		if(user_type === 'drivers') {
			await drivers.find({device_type: device}).then((response) => {
				res.send(response)
			}).catch((error) => {
				res.send(error.message)
			})
		}else if(user_type === 'riders') {
			await riders.find({device_type: device}).then((response) => {
				res.send(response)
			}).catch((error) => {
				res.send(error.message)
			})
		}
		else{
			return next('User type invalid')
		}
	}catch(err){
		return next(err)
	}
}

const cancelRide = async (req,res,next) => {

	try {
		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		const query = { _id: req.params.id }

		const update = {
			canceled: true,
			canceledBy: 'admin'
		}

		const option = { new: true }

		await rides.findOneAndUpdate(query, update, option).then(() => {
			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Ride deleted successfully',
			})
		}).catch((error) => {
			res.send(error.message)
		})

	}catch(err){
		return next(err)
	}
}

const removeDriverFromRide = async  (req,res,next) => {

	try{

		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		const query = { _id: req.params.id }

		const update = {
			driver_id : null,
			vehicle_id : null,
			driver_name: null,
			driver_photo:null,
			driver_rating:null,
			car_name:null,
			car_model:null,
			car_year:null,
			car_plate_number:null,
			status : 'pending'
		}

		const option = { new: true }

		await rides.findOneAndUpdate(query, update, option).then(() => {
			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Ride updated successfully',
			})
		}).catch((error) => {
			res.send(error.message)
		})

	}catch (error) {
		return next(error)
	}
}

const addDriverToRide = async  (req,res,next) => {

	try{

		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		const { new_driver_number , vehicle_id, newFare } = req.body

		if(!new_driver_number){
			return next('New Driver Number required')
		}

		let driver = await drivers.findOne({phone_number:new_driver_number})

		if(!driver){
			return next('Invalid Driver Number')
		}

		if(!vehicle_id){
			return next('New Vehicle Id required')
		}

		let ride_type,car,car_name,car_model,car_type,car_year,car_plate_number,flag=false

		for (const [key, value] of Object.entries(driver.vehicle_information)) {
			if (value._id.equals(vehicle_id)) {
				flag=true
				ride_type = value.category
				car = value.type
				car_name = value.make
				car_model = value.model
				car_type = value.type
				car_year = value.year
				car_plate_number = value.plate_number
			}
		}

		if(flag===false){
			return next('Invalid Vehicle Id')
		}

		const ride = await rides.findById(req.params.id)

		if (ride_type !== ride.ride_type && ride_type === 'standard') {
			return next('Offered vehicle Category does not match required vehicle Category')
		}
		if (ride.ride_type === 'luxury' && ride.car_type !== car) {
			return next('Offered vehicle type does not match required vehicle type')
		}

		const query = { _id: req.params.id }

		const update = {
			driver_id : driver._id,
			vehicle_id,
			driver_name: driver.first_name + driver.last_name,
			driver_photo:driver.photo_url,
			driver_rating:driver.rating ? driver.rating : 0,
			car_name: car_name,
			car_model: car_model,
			car_type: car_type,
			car_year: car_year,
			car_plate_number: car_plate_number,
			status:'scheduled',
		}

		if(newFare){
			update.fare=newFare
		}

		const option = { new: true }

		await rides.findOneAndUpdate(query, update, option).then(() => {
			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Ride updated successfully',
			})
		}).catch((error) => {
			res.send(error.message)
		})

	}catch (error) {
		return next(error)
	}
}

const checkBankAccountStatus = async (req,res,next)=>{

	try{

		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		const driver = await drivers.findById(req.params.id)

		if (!driver) {
			return next('Driver not found')
		}

		if(!driver.bank_information.bankId){
			return next('not uploaded')
		}

		await stripe.accounts.retrieve(
			driver.bank_information.bankId
		).then(async(response)=>{
			if(response.charges_enabled !== false && response.capabilities.transfers === 'active'){
				driver.bank_information.status = 'verified'
				driver.bank_information.verified_at = new Date()
				await driver.save().then(()=>{
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

const getPayments = async (req,res,next)=>{

	try{

		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		await payments.find().then((response)=>{
			return res.status(200).send({
				status: 200,
				error: false,
				response: response
			})
		})

	}catch(err){
		return next(err)
	}
}
const getPaymentById = async (req,res,next)=>{

	try{

		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		await payments.findById(req.params.id).then((response)=>{
			return res.status(200).send({
				status: 200,
				error: false,
				response: response
			})
		})

	}catch(err){
		return next(err)
	}
}

const refundPayments = async (req,res,next)=>{

	try{

		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		await functions.refundCharge(req.params.ride_id,req.params.payment_id).then((response)=>{
			return res.status(200).send({
				status: 200,
				error: false,
				response: response
			})
		})

	}catch(err){
		return next(err)
	}
}

const retryPayment = async(req,res,next) =>{

	try {

		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		await functions.payment(req.params.id).then((response) => {
			if (response === 'Payment charged successfully') {
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Ride ended successfully',
					payment: 'Successful'
				})
			} else {
				return res.status(200).send({
					status: 200,
					error: true,
					message: 'Ride ended successfully',
					payment: 'Failed',
					reason: response
				})
			}
		})
	}catch(err) {
		return next(err)
	}
}

const allEarnings = async (req,res,next)=> {

	try {

		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		await payments.aggregate(
			[{
				$group: {
					_id: null,
					totalTransactions: {$sum: "$price"},
					totalRydelinxEarning: {$sum: "$commission"},
					totalDriverEarnings: {$sum: "$driver_funds"},
					totalStripeFees: {$sum: "$stripe_fee"}
				}
			}]
		).then((response) => {
			if (response.length) {
				return res.status(200).send({
					status: 200,
					error: false,
					response: {
						totalTransactions: response[0].totalTransactions,
						totalRydelinxEarning: response[0].totalRydelinxEarning,
						totalDriverEarnings: response[0].totalDriverEarnings,
						totalStripeFees: response[0].totalStripeFees
					}
				})
			} else {
				return res.status(200).send({
					status: 200,
					error: false,
					response: {
						status: 'No rides'
					}
				})
			}
		})

	} catch (err) {
		return next(err)
	}
}

const allEarningsThisMonth = async (req,res,next)=> {

	try {

		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		await payments.aggregate(
			[{
				$match: {
					createdAt: {$gt: new Date(new Date().getTime() - 2.628e+9)}
				}
			},
				{
					$group: {
						_id: null,
						totalTransactions: {$sum: "$price"},
						totalRydelinxEarning: {$sum: "$commission"},
						totalDriverEarnings: {$sum: "$driver_funds"},
						totalStripeFees: {$sum: "$stripe_fee"}
					}
				}]
		).then((response) => {
			if (response.length) {
				return res.status(200).send({
					status: 200,
					error: false,
					response: {
						totalTransactions: response[0].totalTransactions,
						totalRydelinxEarning: response[0].totalRydelinxEarning,
						totalDriverEarnings: response[0].totalDriverEarnings,
						totalStripeFees: response[0].totalStripeFees
					}
				})
			} else {
				return res.status(200).send({
					status: 200,
					error: false,
					response: {
						status: 'No rides'
					}
				})
			}
		})

	} catch (err) {
		return next(err)
	}
}

const allEarningsThisWeek = async (req,res,next)=> {

	try {

		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		await payments.aggregate(
			[{
				$match: {
					createdAt: {$gt: new Date(new Date().getTime() - 604800000)}
				}
			},
				{
					$group: {
						_id: null,
						totalTransactions: {$sum: "$price"},
						totalRydelinxEarning: {$sum: "$commission"},
						totalDriverEarnings: {$sum: "$driver_funds"},
						totalStripeFees: {$sum: "$stripe_fee"}
					}
				}]
		).then((response) => {
			if (response.length) {
				return res.status(200).send({
					status: 200,
					error: false,
					response: {
						totalTransactions: response[0].totalTransactions,
						totalRydelinxEarning: response[0].totalRydelinxEarning,
						totalDriverEarnings: response[0].totalDriverEarnings,
						totalStripeFees: response[0].totalStripeFees
					}
				})
			}else{
				return res.status(200).send({
					status: 200,
					error: false,
					response: {
						status:'No rides'
					}
				})
			}
		})

	} catch (err) {
		return next(err)
	}
}

const allEarningsForDriver = async (req,res,next)=> {

	try {

		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		const id = req.params.id

		let driver = await drivers.findById(id)

		if(!driver) {
			return next('Driver not found')
		}

		await payments.aggregate(
			[{
				$group: {
					_id: id,
					totalDriverEarnings: {$sum: "$driver_funds"},
				}
			}]
		).then((response) => {
			if (response.length) {
				return res.status(200).send({
					status: 200,
					error: false,
					response: {
						totalDriverEarnings: response[0].totalDriverEarnings
					}
				})
			} else {
				return res.status(200).send({
					status: 200,
					error: false,
					response: {
						status: 'No rides'
					}
				})
			}
		})

	} catch (err) {
		return next(err)
	}
}



module.exports = {
	current,
	sendFcmNotification,
	sendEmails,
	readMail,
	deleteMail,
	sendSms,
	readSms,
	readUser,
	readRides,
	readRideById,
	readRiders,
	readDrivers,
	readDriverVehicles,
	driverDocumentList,
	verifyDriverDocument,
	rejectDriverDocument,
	notifyDocument,
	numberOfAllRides,
	numberOfRidesByMonth,
	numberOfRidesThisMonth,
	numberOfRidesByUser,
	ridesByUsers,
	readUsersByDevice,
	cancelRide,
	removeDriverFromRide,
	addDriverToRide,
	checkBankAccountStatus,
	getPayments,
	getPaymentById,
	refundPayments,
	retryPayment,
	allEarnings,
	allEarningsThisMonth,
	allEarningsThisWeek,
	allEarningsForDriver
}