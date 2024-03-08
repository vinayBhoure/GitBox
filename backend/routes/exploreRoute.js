const express = require('express');
const exploreController = require('../controllers/exploreController');
const router = express.Router();
const ensureAuthentication = require('../middleware/ensureAuthentication');

const route = router.get('/repos/:language',ensureAuthentication, exploreController);

module.exports = route;