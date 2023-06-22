const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const movieController = require('../controllers/movieController');

router.route('/')
    .get(movieController.browse);

router.get('/info', movieController.getInfo);
router.get('/info/score', movieController.getMovieAudienceScore);
//router.get('/recommended', movieController.getForYouTitles);

router.route('/watchlist')
    .get(/*authMiddleware,*/ movieController.getWatchlist)
    .post(authMiddleware, movieController.addToWatchlist)
    .delete(authMiddleware, movieController.removeFromWatchlist);

router.get('/watchlist/check', /*authMiddleware,*/ movieController.isInWatchList);
router.get('/watchlist/find', /*authMiddleware,*/ movieController.getWatchlistMoviesByGenre);

router.route('/likelist')
    .get(/*authMiddleware,*/ movieController.getLikeList)
    .post(authMiddleware, movieController.addToLikeList)
    .delete(authMiddleware, movieController.removeFromLikeList);

router.get('/likelist/check', /*authMiddleware,*/ movieController.isInLikeList);

module.exports = router;