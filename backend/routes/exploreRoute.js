const express = require('express');
const exploreController = require('../controllers/exploreController');
const router = express.Router();

const route = router.get('/repos/:language', exploreController);

module.exports = route;