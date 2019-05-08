const mongoose = require('mongoose');

module.exports = () =>{
	mongoose.connect('mongodb://movie_user:abcd1234@ds147926.mlab.com:47926/heroku_8d01t5gc', { useNewUrlParser: true, useCreateIndex: true});

	mongoose.connection.on('open', () => {
		// console.log('MongoDB: Connected')
	});

	mongoose.connection.on('error', (err) => {
		console.log('MongoDB: Error ', err);
	});

	mongoose.Promise = global.Promise;
};