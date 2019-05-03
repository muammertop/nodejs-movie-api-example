const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
	director_id: Schema.Types.ObjectId,
	title:{
		type: String,
		required: [true, '`{PATH}` alanı zorunludur.'],
		maxlength: 50,
		minlength: 1,
	},
	category: {
		type: String,
		maxlength: 30,
		minlength: 3
	},
	country: {
		type: String,
		maxlength: 20,
		minlength: 2,
	},
	year: {
		type: Number,
		max: 2019,
		min: 1600,
	},
	imdb: {
		type: Number,
		max: 10,
		min: 0
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('movie', MovieSchema);