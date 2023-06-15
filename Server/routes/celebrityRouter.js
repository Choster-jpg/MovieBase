const express = require('express');
const router = express.Router();

const celebrityController = require('../controllers/celebrityController');

router.get('/', celebrityController.getCelebrityInfo);

module.exports = router;