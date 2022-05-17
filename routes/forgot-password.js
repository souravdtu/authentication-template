const express = require('express');
const router = express.Router();
const forgotPassword = require('../controllers/forgot_password');

router.get('/',forgotPassword.forgot);
router.get('/link',forgotPassword.link);

module.exports = router;