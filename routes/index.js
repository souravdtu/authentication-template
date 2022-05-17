const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);

router.use('/sign-in',require('./sign-in'));
router.use('/sign-up',require('./sign-up'));
router.use('/sign-out',require('./sign-out'));
router.use('/forgot-password',require('./forgot-password'));
 
module.exports = router;