const mongoose = require('mongoose')

const faqSchema = new mongoose.Schema({

	type: {
		type: String,
		required: true
	},
	title:  {
		type: String,
		required: true
	},
	description:  {
		type: String,
		required: true
	}

}, { timestamps: true })

module.exports = mongoose.model('faqs', faqSchema)