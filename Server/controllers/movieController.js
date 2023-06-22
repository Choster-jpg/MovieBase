const sequelize = require('../database/database');
const ApiError = require('../error/apiError');

const { Movie, Watchlist, LikeList, Review, Celebrity, MovieCast, User } = require('../models/models').Models(sequelize);

const scrapeService = require('../services/scrapeService');
const movieService = require('../services/movieService');
const userService = require('../services/userService');

const { Sequelize, Op } = require("sequelize");
//const  = require("sequelize");

class MovieController {
    /*async create(req, res, next) {
        try {
            const { poster, title, release_date, runtime, imdb_rate,
                rotten_rate, kinopoisk_rate, metacritic_rate, plot,
                director, genres, budget, gross, cast } = req.body;

            const movie = await movieService.createMovie({poster, title, release_date, runtime, imdb_rate,
                rotten_rate, kinopoisk_rate, metacritic_rate, plot,
                director, genres, budget, gross, cast});

            return res.json(movie);
        }
        catch (e)
        {
            next(e);
        }
    }*/

    async browse(req, res, next) {
        try {
            const {query, limit} = req.query;

            const result = await scrapeService.scrapeTitlesByName(query, limit);
            return res.json(result);
        }
        catch (e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async getInfo(req, res, next) {
        try {
            const { title, year, imdb_link } = req.query;

            const movie = await Movie.findOne({
                where: { imdb_link },
                include: [{
                    model: Celebrity,
                    through: {
                        attributes: ["role_name"],
                    },
                }],

            });

            if(movie) return res.json(movie);

            const result = await scrapeService.scrapeInfoByTitle(title, year, imdb_link);
            return res.json(result);
        }
        catch (e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    /*async getForYouTitles(req, res, next) {
        try {
            const { user_id } = req.query;
            const wMovies = await movieService.getUserWatchlist(user_id);
            const lMovies = await movieService.getUserLikedList(user_id);
            const genres = await scrapeService.scrapeGenres();
            return res.json(movies);
        }
        catch(e) {
            next(new ApiError.Internal(e.message));
        }
    }*/

    async addToWatchlist(req, res, next) {
        try {
            const { user_id, movie } = req.body;

            let candidate;

            if(!movie.id)
            {
                candidate = await Movie.findOne({
                    where: {
                        imdb_link: movie.imdb_link
                    }
                })

                if(!candidate) await movieService.createMovie(movie);
            }

            const result = await Watchlist.create({UserId: user_id, MovieId: movie.id || candidate.id})
            return res.json(result);
        }
        catch(e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async removeFromWatchlist(req, res, next) {
        try {
            const { user_id, movie_id } = req.query;
            const result = await Watchlist.destroy({
                where: { UserId: user_id, MovieId: movie_id }
            });

            return res.json(result);
        }
        catch(e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async isInWatchList(req, res, next) {
        try {
            const { user_id, movie_id } = req.query;
            const result = await Watchlist.findOne({
                where: { UserId: user_id, MovieId: movie_id }
            });

            return res.json(result || false);
        }
        catch(e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async addToLikeList(req, res, next) {
        try {
            const { user_id, movie } = req.body

            let candidate;
            if(!movie.id)
            {
                candidate = await Movie.findOne({
                    where: {
                        imdb_link: movie.imdb_link
                    }
                })

                if(!candidate)
                    candidate = await movieService.createMovie(movie);
            }

            const result = await LikeList.create({UserId: user_id, MovieId: movie.id || candidate.id});
            return res.json(result);
        }
        catch(e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async removeFromLikeList(req, res, next) {
        try {
            const { user_id, movie_id } = req.query;
            const result = await LikeList.destroy({
                where: { UserId: user_id, MovieId: movie_id }
            });

            return res.json(result);
        }
        catch(e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async isInLikeList(req, res, next) {
        try {
            const { user_id, movie_id } = req.query;
            const result = await LikeList.findOne({
                where: { UserId: user_id, MovieId: movie_id }
            });

            return res.json(result || false);
        }
        catch(e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async getWatchlist(req, res, next) {
        try {
            const { user_id } = req.query;
            const movies = await User.findByPk(user_id, {
                attributes: [],
                include: [{
                    model: Movie,
                    through: { model: Watchlist, attributes: []}
                }]
            })

            return res.json(movies);
        }
        catch(e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async getLikeList(req, res, next) {
        try {
            const { user_id } = req.query;
            const movies = await User.findByPk(user_id, {
                attributes: [],
                include: [{
                    model: Movie,
                    through: { model: LikeList, attributes: []}
                }]
            })

            return res.json(movies);
        }
        catch(e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async getWatchlistMoviesByGenre(req, res, next) {
        try {
            const { values } = req.query;
            const decodedValues = JSON.parse(decodeURIComponent(values));

            return res.json(decodedValues);
        }
        catch(e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }

    async getMovieAudienceScore(req, res, next) {
        try {
            const { movie_id } = req.query;
            const data = await Review.findAll({
                attributes: [[Sequelize.fn('AVG', Sequelize.cast(Sequelize.col('overall_rate'), 'DECIMAL')), 'avg_rating']],
                where: { MovieId: movie_id },
            });

            return res.json(data[0]);
        }
        catch(e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }
}

module.exports = new MovieController();