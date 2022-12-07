const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({

	ride_id:  {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'rides'
	},
	driver_id:  {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'drivers'
	},
	vehicle_id:  {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'drivers'
	},
	offer_fare: {
		type: Number,
		required: null
	},
	status: {
		type: String,
		default: 'pending'
	},
	driver_name:{
		type: String,
		required: true
	},
	driver_photo:{
		type: String,
		required: true
	},
	average_rating:{
		type: Number,
	},
	car_name:{
		type: String,
		required: true
	},
	car_model:{
		type: String,
		required: true
	},
	car_type:{
		type: String,
		required: true
	},
	car_year:{
		type: String,
	},
	car_plate_number:{
		type: String,
	},
	bag:{
		type: Number,
	},
	additional_notes:{
		type:String,
		default:null
	},
	pick_up_location: {
		type: {
			type: String,
			enum: ['Point'],
			required: true
		},
		coordinates: {
			type: [Number],
			required: true
		}
	},
	pick_up_address: {
		type: String,
		default: null
	},
	drop_off_location: {
		required:false,
		type: {
			type: String,
			enum: ['Point']
		},
		coordinates: {
			type: [Number]
		}
	},
	drop_off_address: {
		type: String,
		default: null
	},
	pick_up_at: {
		type: Date,
		required: true
	},
	seats_required:{
		type: Number,
		default : 1
	},
	no_of_hours: {
		type: Number,
		default: null
	},

}, { timestamps: true })

module.exports = mongoose.model('offers', offerSchema)