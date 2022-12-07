const mongoose = require('mongoose')

const emailSchema = new mongoose.Schema({

	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	subject:{
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	},
	toArray:[{
		email_address: String
	}],
	all:{
		type: String
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

module.exports = mongoose.model('emails', emailSchema)