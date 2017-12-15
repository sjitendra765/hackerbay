
// Importing Passport, strategies, and config
const passport = require('passport'),
      config = require('./main'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      LocalStrategy = require('passport-local');

      const localOptions = { usernameField: 'username' };

      // Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, function(username, password, done) {
	if(!password)
	return done(null, false, { error: 'Username or password is empty' })
		
	if(username == '' || password == '' || username == undefined || password == undefined)
	return done(null, false, { error: 'Username or password is empty' })
  var user = {
  			username: username,
  			password: password
  }
      return done(null, user);
  
 
});


const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // Telling Passport where to find the secret
  secretOrKey: config.secret
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
      done(null, payload);
});

passport.use(jwtLogin);
passport.use(localLogin);
