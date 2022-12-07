const mongoose = require('mongoose')

const supportEmailSchema = new mongoose.Schema({

	rider_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'riders'
	},
	driver_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'drivers'
	},
	email: {
		type: String,
		required: true
	},
	phone_number:{
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	subject: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	},
	status:{
		type: String,
		default: 'unread'
	},
	starred:{
		type: Boolean,
		default: false
	},
	trash:{
		type: Boolean,
		default: false
	},
	sent_mail:{
		type: Boolean,
		default: false
	},
	rating:{
		type: Number,
		required: true
	},
	attachment:{
		filename:{
			type: String
		},
		path:{
			type: String
		}
	}

}, { timestamps: true })

module.exports = mongoose.model('supportEmails', supportEmailSchema)