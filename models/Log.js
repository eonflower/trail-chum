const mongoose = require('mongoose')
const Schema = mongoose.Schema

const logSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	trail: {
		type: Schema.Types.ObjectId,
		ref: 'Trail',
	},
	trailName: {
		type: String,
	},
	dayNumber: {
		type: Number,
	},
	trailDirection: {
		type: String,
	},
	startLocation: {
		type: String,
	},
	startMileMark: {
		type: String,
	},
	endLocation: {
		type: String,
	},
	endMileMark: {
		type: String,
	},
	description: {
		type: String,
	},
	date: {
		type: String,
		format: Date,
	},
})

logSchema.virtual('mileage').get(function () {
  const startMile = parseFloat(this.startMileMark);
  const endMile = parseFloat(this.endMileMark);
  if (!isNaN(startMile) && !isNaN(endMile)) {
    const distance = Math.abs(endMile - startMile).toFixed(2);
    return distance !== '0.00' ? `${distance} miles` : '';
  }
  return '';
});

module.exports = mongoose.model("Log", logSchema)