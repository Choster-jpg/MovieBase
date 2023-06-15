const sequelize = require('../database/database');
const { Movie, Watchlist, LikeList } = require('../models/models').Models(sequelize);

const scrapeService = require('../services/scrapeService');
const movieService = require('../services/movieService');

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

            const result = await scrapeService.scrapeTitleByName(query, limit);
            return res.json(result);
        }
        catch (e) {
            next(e);
        }
    }

    async getInfo(req, res, next) {
        try {
            const {title, year, imdb} = req.query;

            const movie = await Movie.findOne({
                where: {
                    imdb_link: imdb
                }
            });

            if(movie) return res.json(movie);

            const result = await scrapeService.scrapeInfoByTitleFast(title, year, imdb);
            return res.json(result);
        }
        catch (e) {
            next(e);
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
            next(e);
        }
    }*/

    async addToWatchlist(req, res, next) {
        try {
            const { user_id, movie } = req.body;
            const candidate = await Movie.findOne({
                where: {
                    id: movie.id
                }
            })

            if(!candidate) await movieService.createMovie(movie);
            const result = await Watchlist.create({user_id, movie_id: movie.id})
            return res.json(result);
        }
        catch(e) {
            next(e);
        }
    }

    async removeFromWatchlist(req, res, next) {
        try {
            const { user_id, movie_id } = req.body;
            const result = await Watchlist.destroy({
                where: { user_id, movie_id }
            });

            return res.json(result);
        }
        catch(e) {
            next(e);
        }
    }

    async isInWatchList(req, res, next) {
        try {
            const { user_id, movie_id } = req.body;
            const result = await Watchlist.findOne({
                where: { user_id, movie_id }
            });

            return res.json(result || null);
        }
        catch(e) {
            next(e);
        }
    }

    async addToLikeList(req, res, next) {
        try {
            const { user_id, movie } = req.body
            const candidate = await Movie.findOne({
                where: {
                    id: movie.id
                }
            })

            if(!candidate) await movieService.createMovie(movie);
            const result = await LikeList.create({user_id, movie_id: movie.id})
            return res.json(result);
        }
        catch(e) {
            next(e);
        }
    }

    async removeFromLikeList(req, res, next) {
        try {
            const { user_id, movie_id } = req.body;
            const result = await LikeList.destroy({
                where: { user_id, movie_id }
            });

            return res.json(result);
        }
        catch(e) {
            next(e);
        }
    }

    async isInLikeList(req, res, next) {
        try {
            const { user_id, movie_id } = req.body;
            const result = await LikeList.findOne({
                where: { user_id, movie_id }
            });

            return res.json(result || null);
        }
        catch(e) {
            next(e);
        }
    }

    async getWatchlist(req, res, next) {
        try {
            const { user_id } = req.query;
            const movies = await Watchlist.findAll({
                where: {
                    user_id
                },
                attributes: [],
                include: Movie
            })

            return res.json(movies);
        }
        catch(e) {
            next(e);
        }
    }

    async getLikeList(req, res, next) {
        try {
            const { user_id } = req.query;
            const movies = await LikeList.findAll({
                where: {
                    user_id
                },
                attributes: [],
                include: Movie
            })

            return res.json(movies);
        }
        catch(e) {
            next(e);
        }
    }
}

module.exports = new MovieController();