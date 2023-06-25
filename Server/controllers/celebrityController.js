const sequelize = require('../database/database');
const { Celebrity } = require('../models/models').Models(sequelize);

const scrapeService = require('../services/scrapeService');
const ApiError = require("../error/apiError");

class CelebrityController {
    async getCelebrityInfo(req, res, next) {
        try {
            const { imdb_link } = req.query;
            const result = await scrapeService.scrapeCelebrityInfo(imdb_link);
            return res.json(result); 
        }
        catch (e) {
            console.log(e);
            next(ApiError.Internal(e.message));
        }
    }
}

module.exports = new CelebrityController();