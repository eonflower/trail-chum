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
	notes: [{
		type: Schema.Types.ObjectId,
		ref: "Note"}
	],
	
})


module.exports = mongoose.model("Trail", trailSchema)

