const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//create local strategy
const localOptions = { usernamField: 'email' };
const localLogin = new LocalStrategy({ localOptions }, function(email, password, done) {
//verify username and password, call done with user
//if it is the correct email and password
//otherwise call done with false
 User.findOne({ email: email }, function(err, user) {
 	if (err) { return done(err); }
 	if (!user) { return done(null, false); }

 	//compare passwords - is 'password' equal to user.password?
 	user.comparePassword(password, function(err, isMatch) {
 		if (err) { return done(err); }
        if (!isMatch) { return done(null, false); }

        return done(null, user);
    });

 });
});


//setup options for JWT strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};


//create JWT strategy

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
   // see if user id in payload exist in db
   //if it does, call done with that otherwise
   //call done with user object
   User.findById(payload.sub, function(err, user) {
   	  if (err) {return done(err, false); }


   	  if(user) {
   	  	done(null, user);
   	  } else {
   	  	done(null, false);
   	  }
    });
});

//tell passport to use this strategy

passport.use(jwtLogin);
passport.use(localLogin);