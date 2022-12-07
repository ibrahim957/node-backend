const functions = require('../../../helpers/functions')
const supportEmails = require('../../../models/admin/supportEmailModel')
const users = require('../../../models/admin/userModel')

const storeMail = async (req, res, next) => {

	try {

		if (!req.body.email) {
			return next('Email is required')
		}
		if (!req.body.name) {
			return next('Name is required')
		}
		if (!req.body.subject) {
			return next('Subject is required')
		}
		if (!req.body.message) {
			return next('message is required')
		}

		await supportEmails.create(req.body).then((response) => {
			return res.status(200).send(response)
		}).catch((error) => {
			return res.send(error.message)
		})
	} catch (err) {
		return next(err)
	}
}

const readMail = async (req, res, next) => {

	try {

		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}
		const {type,email_address,id} = req.query

		if(type != null){
			if(type === 'starred'){

				await supportEmails.find({$and:[{trash:false},{starred:true}]}).then((response) => {
					return res.status(200).send({
						status: 200,
						error: false,
						message: 'Starred support emails retrieved successfully',
						response:response
					})
				}).catch((error) => {
					return res.send(error.message)
				})
			}
			else if(type === 'trash'){

				await supportEmails.find({trash:true}).then((response) => {
					return res.status(200).send({
						status: 200,
						error: false,
						message: 'Trash support emails retrieved successfully',
						response:response
					})
				}).catch((error) => {
					return res.send(error.message)
				})
			}
			else if(type === 'sent_mail'){

				await supportEmails.find({$and:[{trash:false},{sent_mail:true}]}).then((response) => {
					return res.status(200).send({
						status: 200,
						error: false,
						message: 'Sent support emails retrieved successfully',
						response:response
					})
				}).catch((error) => {
					return res.send(error.message)
				})
			}
		}
		else if (email_address) {

			await supportEmails.find({$and:[{email: email_address},{trash:false},{sent_mail:false}]}).then((response) => {
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Support emails retrieved successfully',
					response:response
				})
			}).catch((error) => {
				return res.send(error)
			})
		} else if (id) {

			await supportEmails.findOneAndUpdate({_id: id}, {status: 'read'}).then((response) => {
				if(!response){
					response='No data found'
				}
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Support email retrieved successfully',
					response:response
				})
			}).catch((error) => {
				return res.send(error)
			})
		} else {

			await supportEmails.find({$and:[{trash:false},{sent_mail:false}]}).then((response) => {
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Support emails retrieved successfully',
					response:response
				})
			}).catch((error) => {
				return res.send(error.message)
			})
		}
	}catch(err)
	{
		return next(err)
	}
}
const deleteMail = async (req, res, next) => {

	try {
		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		if (!req.params.id) {
			return next('Id of email is required')
		}

		await supportEmails.findOneAndUpdate({_id: req.params.id},{trash:true,starred:false}).then((response) => {
			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Support email sent to trash',
				response:response
			})
		}).catch((error) => {
			return res.send(error.message)
		})

	} catch (err) {
		return next(err)
	}
}

const restoreMail = async (req, res, next) => {

	try {
		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		if (!req.params.id) {
			return next('Id of email is required')
		}

		await supportEmails.findOneAndUpdate({_id: req.params.id},{trash:false}).then((response) => {
			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Support email sent to trash',
				response:response
			})
		}).catch((error) => {
			return res.send(error.message)
		})

	} catch (err) {
		return next(err)
	}
}

const markUnread = async (req, res, next) => {

	try {
		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		if (!req.params.id) {
			return next('Id of email is required')
		}

		await supportEmails.findOneAndUpdate({_id: req.params.id}, {status: 'unread'}).then(() => {
			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Support email marked unread successfully'
			})
		}).catch((error) => {
			return res.send(error.message)
		})

	} catch (err) {
		return next(err)
	}
}

const starMail = async (req, res, next) => {

	try {
		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		if (!req.params.id) {
			return next('Id of email is required')
		}

		await supportEmails.findOneAndUpdate({_id: req.params.id}, {starred: true}).then(() => {
			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Support email starred successfully'
			})
		}).catch((error) => {
			return res.send(error.message)
		})

	} catch (err) {
		return next(err)
	}
}

const unStarMail = async (req, res, next) => {

	try {
		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		if (!req.params.id) {
			return next('Id of email is required')
		}

		await supportEmails.findOneAndUpdate({_id: req.params.id}, {starred: false}).then(() => {
			return res.status(200).send({
				status: 200,
				error: false,
				message: 'Support email unStarred successfully'
			})
		}).catch((error) => {
			return res.send(error.message)
		})

	} catch (err) {
		return next(err)
	}
}

const sendReply = async (req, res, next) => {

	try {

		const email = req.user

		let user = await users.findOne({email: email})

		if (!user) {
			return next('user not found')
		}

		const {from,subject,message} = req.body

		if (!req.params.id) {
			return next('Id of email is required')
		}
		if (!from) {
			return next('Name is required')
		}
		if (!subject) {
			return next('Subject is required')
		}
		if (!message) {
			return next('message is required')
		}

		const supportEmail = await supportEmails.findById(req.params.id)

		await functions.sendEmail(from, supportEmail.email, subject, supportEmail.name, message,req.file).then(async() => {

			await supportEmails.create({
				email:supportEmail.email,
				phone_number:supportEmail.phone_number,
				driver_id: supportEmail.driver_id ? supportEmail.driver_id: null,
				rider_id: supportEmail.rider_id ? supportEmail.rider_id: null,
				name:supportEmail.name,
				subject: subject,
				message: message,
				rating: supportEmail.rating,
				sent_mail:true,
				attachment:req.file
			}).then(() => {
				return res.status(200).send({
					status: 200,
					error: false,
					message: 'Response to support email sent successfully',
				})
			}).catch((error) => {
				return res.send(error.message)
			})
		})

	} catch (err) {
		return next(err)
	}
}


module.exports = {
	storeMail,
	readMail,
	deleteMail,
	restoreMail,
	markUnread,
	starMail,
	unStarMail,
	sendReply,
}