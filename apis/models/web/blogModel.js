const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({

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

module.exports = mongoose.model('blogs', blogSchema)