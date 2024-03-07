const express = require('express');

const router = express.Router();

const authRoute = require('../controllers/authController');
router.use('/login', authRoute)

module.exports = router;