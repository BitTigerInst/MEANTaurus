var router = require('express').Router();
var User = require('../models/user');

router.get('/signup', function (req, res, next) {
	
});

router.post('/signup', function (req, res, next) {
	var user = new User();

	user.profile.name = req.body.name;
	user.password = req.body.password;
	user.email = req.body.email;

//	console.log('name: ' + user.profile.name)
//	console.log('password: ' + user.password)
//	console.log('email: ' + user.email)

	User.findOne({ email: req.body.email }, function (err, existingUser) {

		if (existingUser) {
			console.log(req.body.email + " is already exist.");
			return res.redirect('/signup');
		} else {
			user.save(function (err) {
				if (err) return next(err);
				res.json('Successfully created a new user');
			});
		}
	});
});

module.exports = router;