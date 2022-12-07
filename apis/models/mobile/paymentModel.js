const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({

	rider_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'riders',
		required: true
	},
	transaction_id: {
		type: String,
		required: true
	},
	transfer_id: {
		type: String,
		required: true
	},
	charge_id: {
		type: String,
		required: true
	},
	driver_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'drivers',
		required: true
	},
	ride_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'rides',
		required: true
	},
	ride_type:{
		type: String,
		required: true
	},
	payment_type:{
		type: String,
		default: 'default'
	},
	rider_card_last4: {
		type: String,
		required: true
	},
	rider_card_brand: {
		type: String,
		required: true
	},
	price:  {
		type: Number,
		required:true
	},
	commission:  {
		type: Number,
		required:true
	},
	insurance_fee:  {
		type: Boolean,
		default: false
	},
	stripe_fee:{
		type: Number,
		required: true
	},
	driver_funds:{
		type:Number,
	},
	status: {
		type: String,
		default: 'pending'
	},
	refund_date:{
		type: Date,
		default: null
	},
	transaction_date: {
		type: Date,
		required: true
	},
	approved_date: {
		type: Date,
	}

}, { timestamps: true })

module.exports = mongoose.model('payments', paymentSchema)