const passport = require('passport');
const localStrategy = require('passport-local');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;

const User = require('../model/user');


/* Login and password authorization */
passport.use(new localStrategy(
    function(username, password, done) {
        User.findOne({username}, (error, user) => {
            if (error) {
                done(error);
            }

            if (!user) {
                return done(null, false, {message: 'Incorrect username'});
            }

            if (!user.validPassword(password)) {
                return done(null, false, {message: 'Incorrect password'});
            }

            return done(null, user);
        })
    }
));





