const express = require('express');
const {body} = require('express-validator');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', authMiddleware, userController.logout);
router.post('/reset', userController.reset);
router.post('/reset/password', userController.resetPassword);

router.put('/image', userController.setImage);

router.route('/')
    .put(userController.setInfo)
    .get(userController.getUserData);

router.get('/activate/:link', userController.activate);
router.get('/reset/:link', userController.checkResetLink);
router.get('/refresh', userController.refresh);

router.route('/friends')
    .get(userController.getFriends)
    .post(userController.createFriend)
    .delete(userController.removeFriend);

router.get('/friends/check', userController.checkIsInFriendList);

router.get('/friends/like', userController.getFriendsLikedMovie);

router.get('/find', userController.getUsersByName);

module.exports = router;
