var express = require('express');

var router = express.Router();
var userController = require('../controllers/user');

//create
router.route('/api/signup')
    .post(userController.signup)
//displayAll
router.route('/')
    .get(userController.hello)


module.exports = router;
