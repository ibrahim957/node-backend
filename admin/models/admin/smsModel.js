const mongoose = require('mongoose')

const smsSchema = new mongoose.Schema({

	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	message: {
		type: String,
		required: true
	},
	toArray:[{
		phone_number: String
	}],
	all:{
		type: String
	}

}, { timestamps: true })

module.exports = mongoose.model('sms', smsSchema)