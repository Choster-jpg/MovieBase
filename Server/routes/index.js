const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const movieRouter = require('./movieRouter');
const celebrityRouter = require('./celebrityRouter');
const commentRouter = require('./commentRouter');

router.use('/user', userRouter);
router.use('/movie', movieRouter);
router.use('/celebrity', celebrityRouter);
router.use('/comment', commentRouter);

module.exports = router;


