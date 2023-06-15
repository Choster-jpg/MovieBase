const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController');

router.route('/')
    .get(movieController.browse);

router.get('/info', movieController.getInfo);
//router.get('/recommended', movieController.getForYouTitles);

router.route('/watchlist')
    .get(movieController.getWatchlist)
    .post(movieController.addToWatchlist)
    .delete(movieController.removeFromWatchlist);

router.get('/watchlist/check', movieController.isInWatchList);

router.route('/likelist')
    .get(movieController.getLikeList)
    .post(movieController.addToLikeList)
    .delete(movieController.removeFromLikeList);

router.get('/likelist/check', movieController.isInLikeList);

module.exports = router;