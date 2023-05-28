class RoutesService {
    getImdbIndex() {
        return "https://www.imdb.com";
    }

    getImdbTitleSearch(query) {
        return `https://www.imdb.com/find/?s=tt&q=${query}&ref_=nv_sr_sm`;
    }

    getImdbTitleInfo(id) {
        return `https://www.imdb.com/title/${id}`;
    }

    getKinopoiskSearch(query) {
        const queryResult = query.split(' ').join('+');
        return `https://www.kinopoisk.ru/index.php?kp_query=${queryResult}`;
    }

    getRottenSearch(title) {
        return `https://www.rottentomatoes.com/search?search=${title}`;
    }
}

module.exports = new RoutesService();