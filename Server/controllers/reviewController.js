const sequelize = require('../database/database');
const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const { Review, User, ReviewReaction, Movie } = require('../models/models').Models(sequelize);

const ApiError = require('../error/apiError');

const movieService = require('../services/movieService');
const userService = require('../services/userService');

class ReviewController {
    async createReview(req, res, next) {
        try {
            let { story_rate, visual_rate, acting_rate, originality_rate,
                    emotional_impact_rate, meaning_depth_rate, overall_rate,
                    title, html_content, user_id, movie_id, movie } = req.body;

            const candidate = await Review.findOne({
                where: {
                    UserId: user_id,
                    MovieId: movie_id,
                }
            });

            if(candidate) {
                next(ApiError.BadRequest("You already have review for this movie"));
            }

            if(!movie_id) {
                const result = await movieService.createMovie(movie);
                movie_id = result.id;
            }

            console.log(movie_id);

            const review = await Review.create({ story_rate, visual_rate, acting_rate, originality_rate,
                emotional_impact_rate, meaning_depth_rate, overall_rate,
                title, html_content, UserId: user_id, MovieId: movie_id });

            return res.json(review);
        }
        catch(e) {
            console.log(e);
            next(ApiError.Internal(e.message));
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
            console.log(e);
            next(ApiError.Internal(e.message));
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
            console.log(e);
            next(ApiError.Internal(e.message));
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
                        attributes: ["image", "nickname", "full_name", "id"]
                    },
                    {
                        model: Movie,
                        attributes: ["title", "release_date", "poster", "imdb_link"]
                    },
                    {
                        model: ReviewReaction,
                    }]
            });

            return res.json(review);
        }
        catch(e) {
            console.log(e);
            next(ApiError.Internal(e.message));
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
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async getMovieReviews(req, res, next) {
        try {
            const { movie_id } = req.query;
            const reviews = await Review.findAll({
                where: { MovieId: movie_id },
                include: [{
                    model: User,
                    attributes: ["image", "nickname", "full_name"]
                },],
            })

            return res.json(reviews)
        }
        catch(e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async getFriendsReviews(req, res, next) {
        try {
            const { user_id, filter, limit, page } = req.query;
            let reviews;

            const offset = (page - 1) * limit;

            const ids = await userService.getFriendsIds(user_id);

            if(filter === "Newest") {
                reviews = await Review.findAll({
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    where: {
                        USerId: {
                            [Op.in]: ids,
                        },
                        is_deleted: false,
                    },
                    include: [
                        { model: User, attributes: ["image", "nickname", "full_name", "id"] },
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
                        [Sequelize.fn('COUNT', Sequelize.col('ReviewReactions.id')), 'reactions_count']
                    ],
                    include: [
                        ReviewReaction,
                        { model: User, attributes: ["image", "nickname", "full_name", "id"] },
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

            return res.json(reviews.slice(offset, page * limit));
        }
        catch(e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async getFeedReviews(req, res, next) {
        try {
            const { filter, limit, page } = req.query;
            let reviews;

            const offset = (page - 1) * limit;

            if(filter === "Newest") {
                reviews = await Review.findAll({
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    where: {
                        is_deleted: false,
                    },
                    include: [
                        { model: User, attributes: ["image", "nickname", "full_name", "id"] },
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
                        [Sequelize.fn('COUNT', Sequelize.col('ReviewReactions.id')), 'reactions_count']
                    ],
                    include: [
                        ReviewReaction,
                        { model: User, attributes: ["image", "nickname", "full_name", "id"] },
                        { model: Movie, attributes: ["title", "release_date", "poster"] }
                    ],
                    where: {
                        is_deleted: false,
                    },
                    group: ['Review.id'],
                    order: [[Sequelize.literal('reactions_count'), 'DESC']]
                })
            }

            return res.json(reviews.slice(offset, page * limit));
        }
        catch(e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async getUserReviewReaction(req, res, next) {
        try {
            const { user_id, review_id } = req.query;
            const reaction = await ReviewReaction.findOne({
                where: { user_id, ReviewId: review_id }
            });

            return res.json(reaction);
        }
        catch(e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async removeUserReviewReaction(req, res, next) {
        try {
            const { user_id, review_id } = req.query;

            const reaction = await ReviewReaction.findOne({
                where: {
                    user_id,
                    ReviewId: review_id,
                }
            });

            await ReviewReaction.destroy({
                where: {
                    user_id,
                    ReviewId: review_id,
                }
            })

            return res.json(reaction);
        }
        catch(e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async createUserReviewReaction(req, res, next) {
        try {
            const { user_id, review_id, reaction_type } = req.body;
            const candidate = await ReviewReaction.findOne({
                where: {
                    user_id,
                    ReviewId: review_id,
                }
            });

            let reaction;

            if(candidate) {
                candidate.reaction_type = reaction_type;
                await candidate.save();
                reaction = candidate;
            }
            else {
                reaction = await ReviewReaction.create({user_id, reaction_type, ReviewId: review_id, review_id});
            }

            return res.json(reaction);
        }
        catch (e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async getReviewReactions(req, res, next) {
        try {
            const { review_id } = req.query;
            const reactions = await ReviewReaction.findAll({
                where: {
                    ReviewId: review_id
                }
            });

            const likes = reactions.filter(reaction => reaction.reaction_type === "like");
            const dislikes = reactions.filter(reaction => reaction.reaction_type === "dislike");

            return res.json({likes: likes.length, dislikes: dislikes.length});
        }
        catch (e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }
}

module.exports = new ReviewController();