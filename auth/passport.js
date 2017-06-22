const passport = require('passport');
const LocalStrategy = require('passport-local');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;

const User = require('../model/user');

/* Login and password authorization */
passport.use(new LocalStrategy(
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


/* Token authorization */


const jwtOptions = {
    jwtFromRequest: extractJwt.fromAuthHeader(),
    secretOrKey: 'secret'

};
const jwtLogin = new jwtStrategy(jwtOptions, (payload, done) => {
    User.findOne({_id: payload._id, username: payload.username, password: payload.password})
        .then((user) => {
            if (!user) {
                return done(null, false);
            }
            done(null, user);
        })
        .catch((error) => {
            done(error, false);
        })
});



passport.use(jwtLogin);

