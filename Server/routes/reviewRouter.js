const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviewController');
const authMiddleware = require("../middleware/authMiddleware");

router.route('/')
    .get(reviewController.getReviewDetails)
    .post(/*authMiddleware,*/ reviewController.createReview)
    .put(/*authMiddleware,*/ reviewController.updateReview)
    .delete(/*authMiddleware,*/ reviewController.removeReview);

router.get('/user', reviewController.getUserReviews);
router.get('/movie', reviewController.getMovieReviews);

router.get('/feed', reviewController.getFeedReviews);
router.get('/friends', /*authMiddleware,*/ reviewController.getFriendsReviews);

router.route('/reaction')
    .get(/*authMiddleware,*/ reviewController.getReviewReactions)
    .post(reviewController.createUserReviewReaction)
    .delete(reviewController.removeUserReviewReaction);

router.get('/reaction/user', reviewController.getUserReviewReaction)

module.exports = router;