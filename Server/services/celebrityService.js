const sequelize = require('../database/database');
const { Cast, MovieCast } = require('../models/models').Models(sequelize);

const scrapeService = require('./scrapeService');

class CelebrityService {
    async create(castArray, movieId) {
        const result = [];

        for (const item of castArray) {
            let candidate = await Cast.findOne({
                where: {
                    imdb_link: item.imdbPage
                }
            });

            if(!candidate) {
                candidate = await Cast.create({...await scrapeService.scrapeCelebrityInfo(item.imdbPage), imdb_link: item.imdbPage, biography: "Красавчик"})
            }

            result.push(await MovieCast.create({
                role_name: item.roleName,
                MovieId: movieId,
                CelebrityId: candidate.id,
            }))
        }

        return result;
    }
}

module.exports = new CelebrityService();