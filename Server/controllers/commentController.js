const sequelize = require('../database/database');
const { Comment, Reply, User } = require('../models/models').Models(sequelize);

const ApiError = require('../error/apiError');

class CommentController {
    async createComment(req, res, next) {
        try {
            const { user_id, review_id, text } = req.body;
            const comment = await Comment.create({UserId: user_id, ReviewId: review_id, text});
            return res.json(comment);
        }
        catch(e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async deleteComment(req, res, next) {
        try {
            const { comment_id } = req.body;
            const comment = await Comment.update({ is_deleted: true }, {
                where: { id: comment_id }
            });
            return res.json(comment);
        }
        catch(e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async updateComment(req, res, next) {
        try {
            const { comment_id, text } = req.body;
            const comment = await Comment.update({ text }, {
                where: { id: comment_id }
            });
            return res.json(comment);
        }
        catch(e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async getComments(req, res, next) {
        try {
            const { review_id } = req.query;
            const comments = await Comment.findAll({
                where: {
                    ReviewId: review_id,
                    is_deleted: false,
                },
                include: {
                    model: User, attributes: ["image", "nickname"]
                }
            });
            return res.json(comments);
        }
        catch (e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async createReply(req, res, next) {
        try {
            const { user_id, comment_id, text } = req.body;
            const reply = await Reply.create({UserId: user_id, CommentId: comment_id, text});
            return res.json(reply);
        }
        catch(e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async deleteReply(req, res, next) {
        try {
            const { reply_id } = req.body;
            const reply = await Reply.update({ is_deleted: true }, {
                where: { id: reply_id }
            });
            return res.json(reply);
        }
        catch(e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async updateReply(req, res, next) {
        try {
            const { reply_id, text } = req.body;
            const reply = await Reply.update({ text }, {
                where: { id: reply_id }
            });
            return res.json(reply);
        }
        catch(e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async getReplies(req, res, next) {
        try {
            const { comment_id } = req.query;
            const replies = await Reply.findAll({
                where: {
                    CommentId: comment_id,
                    is_deleted: false,
                },
                include: {
                    model: User, attributes: ["image", "nickname"]
                }
            });
            return res.json(replies);
        }
        catch (e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }
}

module.exports = new CommentController();