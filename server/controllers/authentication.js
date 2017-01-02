const User = require('../models/user');

exports.signup = function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;
	//see if a user with given email exists
	User.findOne({ email: email }, function(err, existingUser) {

	});

	//if a user with email exists, return error

	//if a user with an email does not exist, create and save user record

	//respond to request indicating the user was created
}