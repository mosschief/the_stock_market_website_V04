const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const secret = require('./credentials/jwt_secret');
const User = require('./models/User');

//Passport middleware
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;
passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
      .then(user => {
        return done(null, user)
      })
      .catch(err => {
        return(err, false);
      });
}));

module.exports = passport;