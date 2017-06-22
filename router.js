const express = require('express');
const passport = require('passport');

const authenticationController = require('./controllers/authentication');
const authenticationPassport = require('./auth/passport');


const requireJwt = passport.authenticate('jwt', {session: false});
const requireLocal = passport.authenticate('local', {session: false});

/* /api */
const apiRouter = express.Router();

/* /api/auth */
const authRouter = express.Router();
authRouter.post('/login', requireLocal, authenticationController.login);
authRouter.post('/register', authenticationController.register);



apiRouter.use('/auth', authRouter);

module.exports = apiRouter;