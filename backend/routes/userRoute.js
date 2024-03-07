const express = require('express');
const getUserAndProfile = require('../controllers/getUserAndProfile');
const router = express.Router();

const route = router.get('/profile/:username', getUserAndProfile);

module.exports = route;