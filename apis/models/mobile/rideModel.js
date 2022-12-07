const mongoose = require('mongoose')

const rideSchema = new mongoose.Schema({

	rider_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'riders'
	},
	rider_photo:{
		type: String,
		default: null
	},
	driver_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'drivers'
	},
	driver_name:{
		type: String,
		default: null
	},
	driver_photo:{
		type: String,
		default: null
	},
	driver_rating:{
		type: Number,
		default: null
	},
	vehicle_id:  {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'drivers'
	},
	car_name:{
		type: String,
	},
	car_model:{
		type: String,
	},
	car_type:{
		type: String,
	},
	car_year:{
		type: String,
	},
	car_plate_number:{
		type: String,
	},
	ride_type: {
		type: String,
		enum: ['standard', 'luxury']
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
	ride_duration: {
		type: Number,
		default: null
	},
	seats_required:{
		type: Number,
		default : 1
	},
	bags:{
		type: Number,
	},
	additional_notes:{
		type:String,
		default:null
	},
	no_of_hours: {
		type: Number,
		default: null
	},
	fare: {
		type: Number,
		default: null
	},
	estimated_distance: {
		type: Number,
		default: null
	},
	canceled: {
		type: Boolean,
		default : false
	},
	canceledBy: {
		type: String,
		default: null
	},
	cancel_charges: {
		type: Number,
		default: null
	},
	cancel_charges_status: {
		type: String,
		default: null
	},
	status: {
		type: String,
		default: 'pending'
	},
	receipt: {
		base_fare: {
			type: Number,
			default: 0
		},
		rydelinx_cut: {
			type: Number,
			default: 0
		},
		tip: {
			type: Number,
			default: 0
		},
		total: {
			type: Number,
			default: 0
		}
	},
	events: {
		scheduled: {
			type: Date,
			default: null
		},
		driverOnTheWay: {
			type: Date,
			default: null
		},
		driverAtPickup: {
			type: Date,
			default: null
		},
		rideStarted: {
			type: Date,
			default: null
		},
		rideEnded: {
			type: Date,
			default: null
		},
		rideCompleted: {
			type: Date,
			default: null
		}
	},
	payment_status:{
		type: String,
		default: 'not-charged'
	},
	riderFeedback: {
		message: {
			type: String,
			default: null
		},
		stars: {
			type: Number,
			default: null
		},
		status:{
			type: String,
			default: null
		}
	},
	driverFeedback: {
		stars: {
			type: Number,
			default: null
		}
	}

}, { timestamps: true })

module.exports = mongoose.model('rides', rideSchema)