const express = require('express');
const router = express.Router();
const signUpController = require('../controllers/sign_up_controller');

router.get('/email', signUpController.email);
router.get('/google', signUpController.google);
router.get('/email/data',signUpController.data);

module.exports = router;