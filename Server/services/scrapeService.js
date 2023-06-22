const routesService = require('./routesService');

const imdbSelectors = require('../consts/selectors/imdbSelectors');
const kinopoiskSelectors = require('../consts/selectors/kinopoiskSelectors');
const rottenSelectors = require('../consts/selectors/rottenSelectors');

const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

class ScrapeService {

    constructor() {
        this.config = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
            }
        }
    }

    async scrapeTitlesByName(query, limit = 25) {
        let { data } = await axios.get(routesService.getImdbTitleSearch(query), this.config);
        let $ = cheerio.load(data);
        const listItems = $(imdbSelectors.searchList);

        let result = [];

        listItems.each((index, element) => {
            const title = $(element).find(imdbSelectors.searchTitle).text();

            const images = $(element).find(imdbSelectors.searchImageHref).attr('srcset');
            const srcset = images ? images.split(' ') : null;
            const image = srcset?.[srcset.length - 2].trim();

            const castingSpan = $(element).find(imdbSelectors.searchCastingSpan);
            let yearSpan = $(element).find(imdbSelectors.searchYearSpan);
            const imdb_page = $(element).find(imdbSelectors.searchImdbPage).attr('href').split('/')[2];

            let casting, year;
            if(castingSpan.length)
            {
                casting = castingSpan.text();
                year = yearSpan.text();
            }
            else
            {
                year = parseInt(yearSpan.text()) || undefined;
                casting = year ? undefined : yearSpan.text();
            }
            result.push({title, year, casting, image, imdb_page});
        })

        return result;
    }

    async scrapeInfoByTitle(title, year, imdb) {
        const data_kinopoisk = await axios.get(routesService.getKinopoiskSearch(`${title} ${year}`), this.config);
        const data_imdb = await axios.get(routesService.getImdbTitleInfo(imdb), this.config);

        const $1 = cheerio.load(data_imdb.data);
        const $2 = cheerio.load(data_kinopoisk.data);

        let cast = [];
        $1(imdbSelectors.castList).each((index, element) => {
            cast.push({
                name: $1(element).find(imdbSelectors.personName).text(),
                role_name: $1(element).find(imdbSelectors.personRoleName).text(),
                image: $1(element).find(imdbSelectors.personImage).attr('src'),
                imdb_page: $1(element).find(imdbSelectors.personImdbPage).attr('href').split('/')[2],
            })
        })

        let kinopoisk_rate = "";
        let engName = $2(kinopoiskSelectors.engName).text();
        if($2(kinopoiskSelectors.year).text() === year && engName.slice(0, engName.indexOf(',')) === title)
        {
            kinopoisk_rate = $2(kinopoiskSelectors.rate).text();
        }

        const { data } = await axios.get(routesService.getOmdbData(imdb));
        const posters = $1(imdbSelectors.poster).attr('srcset').split(' ');
        const poster = posters[posters.length - 2];

        return {
            imdb_rate: $1(imdbSelectors.rate).text(),
            kinopoisk_rate,
            metacritic_rate: $1(imdbSelectors.metacriticsRate).text(),
            plot: $1(imdbSelectors.plot).text(),
            director: $1(imdbSelectors.director).text(),
            poster,
            imdb_link: imdb,
            release_date: $1(imdbSelectors.releaseDateSection).find(imdbSelectors.releaseDateLink).text(),
            budget: $1(imdbSelectors.budget).text(),
            gross: $1(imdbSelectors.gross).text(),
            genres: data.Genre.split(','),
            counties: data.Country,
            rotten_rate: data.Ratings.find(item => item.Source === "Rotten Tomatoes").Value,
            runtime:  $1(imdbSelectors.runtime).text(),
            cast,
        };
    }

    async scrapeCelebrityInfo(imdb_page) {
        const data_imdb = await axios.get(routesService.getImdbCelebrityInfo(imdb_page), this.config);
        const $ = cheerio.load(data_imdb.data);

        let born = "";
        $(imdbSelectors.celebrityBornData).each((index, element) => {
            $(element).find('a').each((i, item) => {
                born += (`${$(item).text()}, `);
            })
        });

        return {
            name: $(imdbSelectors.celebrityName).text().trim(),
            height: $(imdbSelectors.celebrityDataSection).find(imdbSelectors.celebrityHeight).text().trim(),
            image: $(imdbSelectors.celebrityImage).attr('src'),
            born: born.trim(),
            imdb_page,
        }
    }
}

module.exports = new ScrapeService();