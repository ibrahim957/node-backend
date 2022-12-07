const mongoose = require('mongoose')

const driverSchema = new mongoose.Schema({

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
		},
		account_status: {
			type: String,
			default: 'in-complete'
		},
		active_status: {
			type: String,
			default: 'inactive'
		},
		in_ride: {
			type: Boolean,
			default: false
		}
	},
	driver_license: {
		url: {
			type: String,
			default: null
		},
		admin_message: {
			type: String,
			default: null
		},
		status: {
			type: String,
			default: 'not-uploaded'
		},
		uploaded_at: {
			type: Date,
			default: null
		},
		verified_at: {
			type: Date,
			default: null
		}
	},
	insurance: {
		insurance_fee:  {
			type: Boolean,
			default: false
		},
		commercial_insurance_url: {
			type: String,
			default: null
		},
		personal_criminal_record_url: {
			type: String,
			default: null
		},
		personal_insurance_url: {
			type: String,
			default: null
		},
		personal_driving_record_url: {
			type: String,
			default: null
		},
		personal_driving_record_admin_message: {
			type: String,
			default: null
		},
		personal_criminal_record_admin_message: {
			type: String,
			default: null
		},
		personal_insurance_admin_message: {
			type: String,
			default: null
		},
		commercial_insurance_admin_message: {
			type: String,
			default: null
		},
		personal_driving_record_status: {
			type: String,
			default: 'not-uploaded'
		},
		personal_criminal_record_status: {
			type: String,
			default: 'not-uploaded'
		},
		commercial_insurance_status: {
			type: String,
			default: 'not-uploaded'
		},
		personal_insurance_status: {
			type: String,
			default: 'not-uploaded'
		},
		personal_driving_record_uploaded_at: {
			type: Date,
			default: null
		},
		personal_criminal_record_uploaded_at: {
			type: Date,
			default: null
		},
		commercial_insurance_uploaded_at: {
			type: Date,
			default: null
		},
		personal_insurance_uploaded_at: {
			type: Date,
			default: null
		},
		personal_driving_record_verified_at: {
			type: Date,
			default: null
		},
		personal_criminal_record_verified_at: {
			type: Date,
			default: null
		},
		commercial_insurance_verified_at: {
			type: Date,
			default: null
		},
		personal_insurance_verified_at: {
			type: Date,
			default: null
		}
	},
	vehicle_information: [{
		plate_number: {
			type: String,
			default: null
		},
		make: {
			type: String,
			default: null
		},
		model: {
			type: String,
			default: null
		},
		year: {
			type: String,
			default: null
		},
		color: {
			type: String,
			default: null
		},
		type: {
			type: String,
			default: null
		},
		category:{
			type: String,
			default: null,
		},
		admin_message: {
			type: String,
			default: null
		},
		registration_status:{
			type: String,
			default: 'not_uploaded'
		},
		vehicle_status: {
			type: String,
			default: 'not-uploaded'
		},
		vehicle_uploaded_at: {
			type: Date,
			default: null
		},
		registration_uploaded_at: {
			type: Date,
			default: null
		},
		vehicle_verified_at: {
			type: Date,
			default: null
		},
		registration_verified_at: {
			type: Date,
			default: null
		},
		max_passenger_seats:{
			type: Number,
			default: null
		},
		url: {
			type: String,
			default: null
		},
		default_vehicle: {
			type: Boolean,
			default: false
		}
	}],
	security_information: {
		ssn: {
			type: String,
			default: null
		},
		tax_id: {
			type: String,
			default: null
		},
		admin_message: {
			type: String,
			default: null
		},
		status: {
			type: String,
			default: 'not-uploaded'
		},
		uploaded_at: {
			type: Date,
			default: null
		},
		verified_at: {
			type: Date,
			default: null
		}
	},
	bank_information: {
		bankId:{
			type: String,
			default: null
		},
		status: {
			type: String,
			default: 'not-uploaded'
		},
		uploaded_at: {
			type: Date,
			default: null
		},
		verified_at: {
			type: Date,
			default: null
		}
	}

}, { timestamps: true })

module.exports = mongoose.model('drivers', driverSchema)