const jwt = require('jsonwebtoken');

const User = require('../model/user');

function generateToken(user) {
    jwt.sign({
        _id: user.id,
        username: user.username,
        password: user.password
    }, "secret", {expiresIn:"7d"});
}


/* /login - for login and password authorization */
exports.login = function(req, res) {
    res.status(200).json({
        result: "success",
        token: `JWT ${generateToken(req.user)}`,
        user: helpers.getUserInfo(req.user)
    });
};

/* /register */
exports.register = function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({error: "The required parameters are missing."});
    }

    User.findOne({username}, null, {collation: {locale: 'en', strength: 2}})
        .then((existingUSer) => {
            if (existingUSer) {
                return res.status(400).json({error: "This login already exists."})
            }

            const user = new User({
                username: username,
                password: password
            });

            user.save()
                .then(() => {
                    return res.status(200).json({result: 'success'})
                })
                .catch((error) => {
                    if (erorr.name === "ValidationError") {
                        return res.status(400).json({error: "This password is not valid"})
                    }
                    return next(error)
                })

        })
        .catch((error) => {
            return next(error);
        })
};




