var passport = require('passport');
var User = require('../models/User');

exports.hello = function(req, res, next) {
    res.send("hello" + global.main++)
}
exports.signup = function(req, res, next) {
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.assert('email', 'Email is not valid').isEmail();

    var mappedErrors = req.validationErrors(true);
    //
    if (mappedErrors) {
        res.status(400).send(mappedErrors);
        return;
    }

    let userBody = {
        email: req.body.email,
        password: req.body.password
    }

    userBody.email = req.sanitize('email').normalizeEmail({remove_dots: false});


    new User(userBody).save().then((user) => {
        res.send(201)
    }).catch((err) => {
        console.error(err);
        res.send(400)
    });
};
