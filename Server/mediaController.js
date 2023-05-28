const { Media } = require('./models/models');

const scrapService = require('./services/scrapService');

class MediaController {
    async getAll(req, res, next) {
        try {

        }
        catch (e) {
            throw e;
        }
    }

    async get(req, res, next) {
        try {
            const {query, limit} = req.query;

            // TODO: поискать в базе данных
            const result = await scrapService.scrapMediaByName(query, limit);
            return res.json(result);
        }
        catch (e) {
            throw e;
        }
    }

    async getInfo(req, res, next) {
        try {
            const {title, year, imdb} = req.query;

            //TODO: поискать в базе данных
            const result = await scrapService.scrapInfoByTitle(title, year, imdb);
            return res.send(result);
        }
        catch (e) {
            throw e;
        }
    }
}

module.exports = new MediaController();