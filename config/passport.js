var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy();

/* 
In a typical web application, the credentials used to authenticate a user will only be transmitted during 
the login request. If authentication succeeds, a session will be established and maintained via a cookie 
set in the user's browser.
*/

// serialize and deserialize for the login session
// only the user ID is serialized to the session, keeping the amount of data stored within the session small. 
passport.serializeUser(function(user, done) {
	//
	done(null, user._id);
});

// When subsequent requests are received, this ID is used to find the user, which will be restored to req.user.
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});


// Middleware
// 'local-login' is the name we gave to our local login
passport.use('local-login', new LocalStrategy({
	usernameField: 'email', // Use the email as the user name field
	passwordField: 'password', // Use the password as the password field
	passReqToCallback: true
}, function(req, email, password, done) {
	// function to validate the input email and password
	User.findOne({ email: email }, function(err, user) {
		if (err) return done(err);
		
		// if the user doesn't exist
		if (!user) {
			return done(null, false, req.flash('loginMessage', 'No user has been found'));
		}
		
		// if the user password is wrong
		if (!user.comparePassword(password)) {
			return done(null, false, req.flash('loginMessage', 'Oops! Wrong Password'));
		}
		
		return done(null, user);
	});
}));

// custom function to validate
exports.isAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login')
}
