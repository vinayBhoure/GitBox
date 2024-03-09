const express = require('express');
const router = express.Router();

const explorePage = require('../controller/explorePage');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
router.get('/:language', ensureAuthenticated, explorePage);

module.exports = router;