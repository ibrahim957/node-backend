const mongoose = require('mongoose')

const riderSchema = new mongoose.Schema({

	phone_number:  {
		type: String,
		required: true,
		unique: true
	},
	device_type: {
		type: String,
		required: true
	},
	verification_code: {
		type: Number,
		default: null
	},
	first_name: {
		type: String,
		default: null
	},
	last_name: {
		type: String,
		default: null
	},
	email_address: {
		type: String,
		default: null
	},
	photo_url: {
		type: String,
		default: null
	},
	rating:{
		type:Number,
		default: 0
	},
	completed_rides:{
		type:Number,
		default: 0
	},
	device_token: {
		type: String,
		default: null
	},
	status: {
		user_exists: {
			type: Boolean,
			default: false
		},
		policies_accepted: {
			type: Boolean,
			default: false
		}
	},
	customer_id:{
		type: String,
		default: null
	},
	payment_information: [{
		card_id: {
			type: String,
			default: null
		},
		card_type:{
			type:String,
			default: null
		},
		card_number: {
			type: String,
			default: null
		},
		expiration_date: {
			type: Date,
			default: null
		},
		uploadedAt: {
			type: Date,
			default: null
		},
		default: {
			type: Boolean,
			default: false
		}
	}]

}, { timestamps: true })

module.exports = mongoose.model('riders', riderSchema)