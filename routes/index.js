const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home_controller');
const signUpController = require('../controllers/sign_up_controller');

router.get('/', homeController.home);

router.use('/sign-in',require('./sign-in'));
router.use('/sign-up',require('./sign-up'));
router.use('/sign-out',require('./sign-out'));
router.use('/forgot-password',require('./forgot-password'));
router.get('/users/auth/google/callback', passport.authenticate('google',{failureRedirect: '/'}), signUpController.google);
 
module.exports = router;