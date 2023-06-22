const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const commentController = require('../controllers/commentController');

router.route('/')
    .get(commentController.getComments)
    .post(/*authMiddleware,*/ commentController.createComment)
    .put(/*authMiddleware,*/ commentController.updateComment)
    .delete(/*authMiddleware,*/ commentController.deleteComment);

router.route('/reply')
    .get(commentController.getReplies)
    .post(/*authMiddleware,*/ commentController.createReply)
    .put(/*authMiddleware,*/ commentController.updateReply)
    .delete(/*authMiddleware,*/ commentController.deleteReply);

module.exports = router;