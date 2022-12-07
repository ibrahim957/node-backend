const mongoose = require('mongoose')

const newsLetterSchema = new mongoose.Schema({

	thumbnail: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}

}, { timestamps: true })

module.exports = mongoose.model('newsLetters', newsLetterSchema)