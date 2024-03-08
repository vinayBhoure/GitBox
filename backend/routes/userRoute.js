const express = require('express');
const getUserAndProfile = require('../controllers/getUserAndProfile');
const router = express.Router();
const ensureAuthentication = require('../middleware/ensureAuthentication');

const route = router.get('/profile/:username',ensureAuthentication, getUserAndProfile);

module.exports = route;