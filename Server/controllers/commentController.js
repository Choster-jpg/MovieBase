const sequelize = require('../database/database');
const { Comment, Reply, User } = require('../models/models').Models(sequelize);

class CommentController {
    async createComment(req, res, next) {
        try {
            const { user_id, text } = req.body;
            const comment = await Comment.create({UserId: user_id, text});
            return res.json(comment);
        }
        catch(e) {
            next(e);
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
            next(e);
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
            next(e);
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
                    model: User, attributes: ["image", "full_name"]
                }
            });
            return res.json(comments);
        }
        catch (e) {
            next(e);
        }
    }

    async createReply(req, res, next) {
        try {
            const { user_id, comment_id, text } = req.body;
            const reply = await Reply.create({UserId: user_id, CommentId: comment_id, text});
            return res.json(reply);
        }
        catch(e) {
            next(e);
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
            next(e);
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
            next(e);
        }
    }

    async getReplies(req, res, next) {
        try {
            const { comment_id } = req.query;
            const replies = await Comment.findAll({
                where: {
                    CommentId: comment_id,
                    is_deleted: false,
                },
                include: {
                    model: User, attributes: ["image", "full_name"]
                }
            });
            return res.json(replies);
        }
        catch (e) {
            next(e);
        }
    }
}

module.exports = new CommentController();