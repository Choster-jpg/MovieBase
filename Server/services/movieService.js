const sequelize = require('../database/database');
const { Movie, Watchlist, LikeList } = require('../models/models').Models(sequelize);

const castService = require('./celebrityService');

class MovieService {
    async createMovie(movie) {
        const { poster, title, release_date, runtime, imdb_rate,
            rotten_rate, kinopoisk_rate, metacritic_rate, plot,
            director, genres, budget, gross, cast, imdb_link, Celebrities } = movie;

        const result = await Movie.create({
            poster, title, release_date, runtime, imdb_rate,
            rotten_rate, kinopoisk_rate, metacritic_rate, plot,
            director, genres, budget, gross, imdb_link, Celebrities });

        await castService.create(cast ? cast : Celebrities, result.id);

        return result;
    }

    async getUserWatchlist(userId) {
        return await Watchlist.findAll({
            where: {
                user_id: userId
            },
            include: {
                model: Movie,
                attributes: ['title', 'genres']
            }
        });
    }

    async getUserLikedList(userId) {
        return await LikeList.findAll({
            where: { user_id: userId },
            include: {
                model: Movie,
                attributes: ['title', 'genres']
            }
        });
    }

    async getRecommended() {

    }

    async isFilmExistsInDatabase(imdb_link) {
        return await Movie.findOne({
            where: { imdb_link },
            attributes: ["id"],
        });
    }
}

module.exports = new MovieService();