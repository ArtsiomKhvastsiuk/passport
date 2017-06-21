const express = require('express');
const passport = require('passport');

const authenticationController = require('./controllers/authentication');
const authenticationPassport = require('./auth/passport');
const requireJwt = passport.authentication('jwt', {session: false});
const requireLocal = passport.authentication('local', {session: false});

/* /api */
const apiRouter = express.Router();

/* /api/auth */
const authRouter = express.Router();
authRouter.post('/login', requireLocal, authenticationController.login);



//passport.authentication - docs
