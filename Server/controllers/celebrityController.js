const sequelize = require('../database/database');
const { Celebrity } = require('../models/models').Models(sequelize);

const scrapeService = require('../services/scrapeService');

class CelebrityController {
    async getCelebrityInfo(req, res, next) {
        const { imdb_link } = req.query;
        const result = await scrapeService.scrapeCelebrityInfo(imdb_link);
        return res.json(result);
    }
}

module.exports = new CelebrityController();