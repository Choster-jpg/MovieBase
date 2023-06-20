const sequelize = require('../database/database');
const { Celebrity, MovieCast } = require('../models/models').Models(sequelize);

const scrapeService = require('./scrapeService');

class CelebrityService {
    async create(castArray, movieId) {
        const result = [];

        for (const item of castArray) {
            let candidate = await Celebrity.findOne({
                where: {
                    imdb_page: item.imdb_page,
                }
            });

            if(!candidate) {
                candidate = await Celebrity.create({...await scrapeService.scrapeCelebrityInfo(item.imdb_page), biography: "Красавчик"})
            }

            result.push(await MovieCast.create({
                role_name: item.role_name || item.MovieCast.role_name,
                MovieId: movieId,
                CelebrityId: candidate.id,
            }))
        }

        return result;
    }
}

module.exports = new CelebrityService();