const express = require('express');
const {body} = require('express-validator');
const router = express.Router();

router.post('/register',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.register);

router.post('/login',  userController.login);
router.post('/logout', authMiddleware(false), userController.logout);
router.post('/reset',  userController.reset);
router.post('/reset/password', userController.resetPassword);
router.post('/info', authMiddleware(false), userController.setInfo)

router.get('/activate/:link', userController.activate);
router.get('/reset/:link', userController.checkResetLink);
router.get('/refresh', userController.refresh);

router.get('/', authMiddleware(false), userController.getAll);
router.delete('/', authMiddleware(false), )

module.exports = router;
