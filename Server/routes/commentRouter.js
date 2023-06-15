const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');

router.route('/')
    .get(commentController.getComments)
    .post(commentController.createComment)
    .put(commentController.updateComment)
    .delete(commentController.deleteComment);

router.route('/reply')
    .get(commentController.getReplies)
    .post(commentController.createReply)
    .put(commentController.updateReply)
    .delete(commentController.deleteReply);

module.exports = router;