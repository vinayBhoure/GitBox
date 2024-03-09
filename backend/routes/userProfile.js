const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const profile = require('../controller/profile');
const like = require('../controller/like');
const getLikes = require('../controller/getLikes');
router.get('/profile/:username', profile);
router.get('/likes', ensureAuthenticated, getLikes);
router.get('/like/:username', ensureAuthenticated , like);

module.exports = router;