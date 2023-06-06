const express = require('express');
const {body} = require('express-validator');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/reset', userController.reset);
router.post('/reset/password', userController.resetPassword);
router.post('/info', userController.setInfo)

router.get('/activate/:link', userController.activate);
router.get('/reset/:link', userController.checkResetLink);
router.get('/refresh', userController.refresh);

module.exports = router;
