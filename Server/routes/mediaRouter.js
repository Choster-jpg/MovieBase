const express = require('express');
const router = express.Router();

const mediaController = require('../mediaController');

router.get('/search', mediaController.get);
router.get('/info', mediaController.getInfo);

module.exports = router;