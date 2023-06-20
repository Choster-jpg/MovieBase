class RoutesService {
    getImdbIndex() {
        return "https://www.imdb.com";
    }

    getImdbTitleSearch(query) {
        return this.getImdbIndex() + `/find/?s=tt&q=${query}&ref_=nv_sr_sm`;
    }

    getImdbTitleInfo(id) {
        return this.getImdbIndex() + `/title/${id}`;
    }

    getImdbGenres() {
        return this.getImdbIndex() + "/article/contribution/titles/genres/GZDRMS6R742JRGAG?ref_=helpms_helpart_inline#";
    }

    getImdbCelebrityInfo(link) {
        return this.getImdbIndex() + `/name/${link}/?ref_=tt_cl_t_1`;
    }

    getKinopoiskSearch(query) {
        const queryResult = query.split(' ').join('+');
        return `https://www.kinopoisk.ru/index.php?kp_query=${queryResult}`;
    }

    getRottenSearch(title) {
        return `https://www.rottentomatoes.com/search?search=${title}`;
    }

    getOmdbData(imdb) {
        return `http://www.omdbapi.com/?i=${imdb}&plot=full&apikey=7c23b757`;
    }
}

module.exports = new RoutesService();