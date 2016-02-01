

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	local: {
		username: String,
		password: String
	}
});
//this can be accessed outside of the file
module.exports = mongoose.model('User', userSchema);