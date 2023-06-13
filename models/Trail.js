const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trailSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	notes: [{
		type: Schema.Types.ObjectId,
		ref: "Note"}
	],
	trailName: {
		type: String,
		required: true,
	}
	
})


module.exports = mongoose.model("Trail", trailSchema)

