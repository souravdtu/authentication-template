const express = require('express');
const passport = require('passport');
const router = express.Router();
const signInController = require('../controllers/sign_in_controller');

router.get('/', passport.authenticate('local',{failureRedirect: '/'}) ,signInController.in);
router.get('/reset-password',passport.checkAuthentication,signInController.reset_password);
router.get('/via-mail/reset-password',signInController.reset_password);
router.get('/reset-password/data/:email',signInController.reset_password_data);


module.exports = router;