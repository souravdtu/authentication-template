const express = require('express');
const router = express.Router();
const passport = require('passport');
const signOutController = require('../controllers/sign_out_controller')

router.get('/',passport.checkAuthentication,signOutController.out);

module.exports = router;