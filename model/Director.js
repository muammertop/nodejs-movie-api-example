const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
	name: {
		type: String,
		maxlength: 25,
		minlength: 3
	},
	surname: {
		type: String,
		maxlength: 25,
		minlength: 2,
	},
	bio: {
		type: String,
		maxlength: 1000,
		minlength: 3,
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('director', DirectorSchema);