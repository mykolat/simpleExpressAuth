var express = require('express');
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');

var userRoutes = require('./routes/user-routes');
// Passport OAuth strategies
require('./config/passport');

var app = express();
global.main = 0;

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator({
    customValidators: {
        isArray: function (value) {
            return Array.isArray(value);
        }
    }
}));
app.use(function (req, res, next) {
    res.locals.user = req.user ? req.user.toJSON() : null;
    next();
});

app.use('/', userRoutes);


app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
