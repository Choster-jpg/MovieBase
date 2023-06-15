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

    async scrapeTitleByName(query, limit = 25) {
        let { data } = await axios.get(routesService.getImdbTitleSearch(query), this.config);
        let $ = cheerio.load(data);
        const listItems = $(imdbSelectors.searchList);

        let result = [];

        listItems.each((index, element) => {
            const title = $(element).find(imdbSelectors.searchTitle).text();
            const image = $(element).find(imdbSelectors.searchImageHref).attr('src');
            const castingSpan = $(element).find(imdbSelectors.searchCastingSpan);
            const yearSpan = $(element).find(imdbSelectors.searchYearSpan);
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

    async scrapeInfoByTitleFast(title, year, imdb) {
        const data_kinopoisk = await axios.get(routesService.getKinopoiskSearch(`${title} ${year}`), this.config);
        const data_imdb = await axios.get(routesService.getImdbTitleInfo(imdb), this.config);

        const $1 = cheerio.load(data_imdb.data);
        const $2 = cheerio.load(data_kinopoisk.data);

        let cast = [];
        $1(imdbSelectors.castList).each((index, element) => {
            cast.push({
                name: $1(element).find(imdbSelectors.personName).text(),
                roleName: $1(element).find(imdbSelectors.personRoleName).text(),
                image: $1(element).find(imdbSelectors.personImage).attr('src'),
                imdbPage: $1(element).find(imdbSelectors.personImdbPage).attr('href').split('/')[2],
            })
        })


        let kinopoiskRate = "";
        let engName = $2(kinopoiskSelectors.engName).text();
        if($2(kinopoiskSelectors.year).text() === year && engName.slice(0, engName.indexOf(',')) === title)
        {
            kinopoiskRate = $2(kinopoiskSelectors.rate).text();
        }

        return {
            imdbRate: $1(imdbSelectors.rate).text(),
            kinopoiskRate,
            metacriticsRate: $1(imdbSelectors.metacriticsRate).text(),
            plot: $1(imdbSelectors.plot).text(),
            director: $1(imdbSelectors.director).text(),
            poster: $1(imdbSelectors.poster).attr('src'),
            releaseDate: $1(imdbSelectors.releaseDateSection).find(imdbSelectors.releaseDateLink).text(),
            budget: $1(imdbSelectors.budget).text(),
            gross: $1(imdbSelectors.gross).text(),
            cast,
        };
    }

    async scrapeInfoByTitleSlow(title, year, imdb) {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();

        await page.goto(routesService.getImdbTitleInfo(imdb), { waitUntil: 'networkidle0' })
        const imdbHTML = await page.content();

        await page.goto(routesService.getRottenSearch(title), { waitUntil: 'networkidle0' });
        await page.waitForSelector(rottenSelectors.searchList);
        const rottenHTML = await page.content();

        const $1 = cheerio.load(imdbHTML);
        const $3 = cheerio.load(rottenHTML);

        let rottenRate = "";
        $3(rottenSelectors.searchList).each((index, element) => {
            const _title = $3(element).find(rottenSelectors.elementTitle).text().trim();
            const _year = $3(element).attr('releaseyear');
            if(_title === title && _year.includes(year))
            {
                rottenRate = $3(element).attr('tomatometerscore');
                return false;
            }
        })

        const string = $1('script:contains(genre)').text();
        const indexStart = string.indexOf('[');
        const indexEnd = string.indexOf(']', indexStart) + 1;
        const stringArray = string.slice(indexStart, indexEnd);
        const genres = JSON.parse(stringArray);

        await browser.close();

        return {
            genres,
            rottenRate
        }
    }

    async scrapeCelebritiesByName() {

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
        }
    }

    async scrapeGenres() {
        const data_imdb = await axios.get(routesService.getImdbGenres(), this.config);
        const $ = cheerio.load(data_imdb.data);

        const genres = [];
        $(imdbSelectors.genres).each((index, element) => {
            genres.push($(element).text().trim());
        });

        return genres;
    }

}

module.exports = new ScrapeService();