const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trailSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	trailName: {
		type: String,
		required: true,
	},
	logs: [{
		type: Schema.Types.ObjectId,
		ref: "Log"}
	],
	
})


module.exports = mongoose.model("Trail", trailSchema)

