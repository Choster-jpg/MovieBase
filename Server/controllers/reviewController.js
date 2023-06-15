const sequelize = require('../database/database');
const Sequelize = require('sequelize');
const {DataTypes, Op} = require("sequelize");
const { Review, User, ReviewReaction, Movie } = require('../models/models').Models(sequelize);

class ReviewController {
    async createReview(req, res, next) {
        try {
            const { story_rate, visual_rate, acting_rate, originality_rate,
                    emotional_impact_rate, meaning_depth_rate, overall_rate,
                    title, html_content, user_id } = req.body;

            const review = await Review.create({ story_rate, visual_rate, acting_rate, originality_rate,
                emotional_impact_rate, meaning_depth_rate, overall_rate,
                title, html_content, UserId: user_id });

            return res.json(review);
        }
        catch(e) {
            next(e);
        }
    }

    async updateReview(req, res, next) {
        try {
            const { review_id, story_rate, visual_rate, acting_rate, originality_rate,
                emotional_impact_rate, meaning_depth_rate, overall_rate,
                title, html_content } = req.body;

            const review = await Review.update({story_rate, visual_rate, acting_rate, originality_rate,
                emotional_impact_rate, meaning_depth_rate, overall_rate,
                title, html_content}, { where: { id: review_id }});

            return res.json(review);
        }
        catch(e) {

        }
    }

    async removeReview(req, res, next) {
        try {
            const { review_id } = req.body;
            const review = await Review.update({id_deleted: true}, {
                where: {id: review_id}
            });

            return res.json(review);
        }
        catch(e) {
            next(e);
        }
    }

    async getReviewDetails(req, res, next) {
        try {
            const { review_id } = req.query;
            const review = await Review.findOne({
                where: {id: review_id},
                include: [
                    {
                        model: User,
                        attributes: ["image", "nickname", "full_name"]
                    },
                    {
                        model: Movie,
                        attributes: ["title", "release_date", "poster"]
                    }]
            });

            return res.json(review);
        }
        catch(e) {
            next(e);
        }
    }

    async getUserReviews(req, res, next) {
        try {
            const { user_id } = req.query;
            const reviews = await Review.findAll({
                where: { UserId: user_id },
                include: [{ model: Movie, attributes: ["title", "release_date", "poster"]}]
            });

            return res.json(reviews);
        }
        catch(e) {

        }
    }

    async getFriendsReviews(req, res, next) {
        try {
            const { user_id, filter } = req.query;
            let reviews;

            if(filter === "newest") {
                reviews = await Review.findAll({
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    where: {
                        user_id: {
                            [Op.in]: Sequelize.literal(`SELECT friend_id FROM UserRelationship WHERE friend_owner_id = ${user_id}`),
                        },
                        is_deleted: false,
                    },
                    include: [
                        { model: User, attributes: ["image", "nickname", "full_name"] },
                        { model: Movie, attributes: ["title", "release_date", "poster"], }
                    ],
                })
            }
            else {
                reviews = await Review.findAll({
                    attributes: [
                        'id',
                        'overall_rate',
                        'title',
                        'html_content',
                        'createdAt',
                        [Sequelize.fn('COUNT', Sequelize.col('ReviewReaction.id')), 'reactions_count']
                    ],
                    include: [
                        ReviewReaction,
                        { model: User, attributes: ["image", "nickname", "full_name"] },
                        { model: Movie, attributes: ["title", "release_date", "poster"] }
                    ],
                    where: {
                        is_deleted: false,
                        user_id: {
                            [Op.in]: Sequelize.literal(`SELECT friend_id FROM UserRelationship WHERE friend_owner_id = ${user_id}`)
                        },
                    },
                    group: ['Review.id'],
                    order: [[Sequelize.literal('reactions_count'), 'DESC']]
                })
            }

            return res.json(reviews);
        }
        catch(e) {

        }
    }

    async getFeedReviews(req, res, next) {
        try {
            const { filter } = req.query;
            let reviews;

            if(filter === "newest") {
                reviews = await Review.findAll({
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    where: {
                        is_deleted: false,
                    },
                    include: [
                        { model: User, attributes: ["image", "nickname", "full_name"] },
                        { model: Movie, attributes: ["title", "release_date", "poster"] }
                    ],
                })
            }
            else {
                reviews = await Review.findAll({
                    attributes: [
                        'id',
                        'overall_rate',
                        'title',
                        'html_content',
                        'createdAt',
                        [Sequelize.fn('COUNT', Sequelize.col('ReviewReaction.id')), 'reactions_count']
                    ],
                    include: [
                        ReviewReaction,
                        { model: User, attributes: ["image", "nickname", "full_name"] },
                        { model: Movie, attributes: ["title", "release_date", "poster"] }
                    ],
                    where: {
                        is_deleted: false,
                    },
                    group: ['Review.id'],
                    order: [[Sequelize.literal('reactions_count'), 'DESC']]
                })
            }

            return res.json(reviews);
        }
        catch(e) {

        }
    }

    async getUserReviewReaction(req, res, next) {
        const { user_id, review_id } = req.query;
        const reaction = await ReviewReaction.findOne({
            where: { user_id, review_id }
        });

        return res.json(reaction || null);
    }
}

module.exports = new ReviewController();