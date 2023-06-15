function return_list() {
    return {
        rate: 'div.sc-3a4309f8-0:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a:nth-child(2) > span:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span:nth-child(1)',
        director: '.sc-52d569c6-3 > div:nth-child(1) > ul:nth-child(1) > li:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)',
        plot: '.sc-2eb29e65-1',
        poster: '.ipc-media--poster-l > img:nth-child(1)',
        castList: '.ipc-sub-grid--wraps-at-above-l > div',
        genreList: 'ul.ipc-metadata-list:nth-child(8) > li:nth-child(2) > div:nth-child(2) > ul:nth-child(1) > li',
        releaseDateSection: 'section.ipc-page-section:contains(Details)',
        releaseDateLink: 'div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)',
        originCountries: 'section.ipc-page-section:nth-child(43) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(2) > div:nth-child(2) > ul:nth-child(1) > li',
        budget: 'li.sc-6d4f3f8c-2:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > span:nth-child(1)',
        gross: 'li.sc-6d4f3f8c-2:nth-child(4) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > span:nth-child(1)',
        runtime: '.sc-afe43def-4 > li:nth-child(3)',
        metacriticsRate: '.score-meta',
        fullContent: '.sc-ab73d3b3-0',

        personImage: 'div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > img:nth-child(1)',
        personName: 'div:nth-child(2) > a:nth-child(1)',
        personRoleName: 'div:nth-child(2) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1) > span:nth-child(1)',
        personImdbPage: 'div:nth-child(2) > a:nth-child(1)',

        searchList: '.ipc-metadata-list > li',
        searchTitle: 'div:nth-child(2) > div:nth-child(1) > a:nth-child(1)',
        searchImageHref: 'div:nth-child(1) > div:nth-child(1) > img:nth-child(1)',
        searchCastingSpan: 'div:nth-child(2) > div:nth-child(1) > ul:nth-child(3) > li:nth-child(1) > span:nth-child(1)',
        searchYearSpan: 'div:nth-child(2) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(1) > span:nth-child(1)',
        searchImdbPage: 'div:nth-child(2) > div:nth-child(1) > a:nth-child(1)',
        searchShowMoreButton: 'button.ipc-btn--single-padding',
        searchWaitForSelector: 'li.ipc-metadata-list-summary-item:nth-child(26)',

        genres: 'div.article__second_section:nth-child(4) > p:nth-child(1) > a',

        celebrityName: '.sc-afe43def-1',
        celebrityDataSection: 'section.ipc-page-section:contains(Personal details)',
        celebrityHeight: 'div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > span:nth-child(1)',
        celebrityBornData: 'li.ipc-metadata-list__item:nth-child(2) > div:nth-child(2) > ul:nth-child(1) > li',
        celebrityImage: '.sc-385ac629-7 > div:nth-child(1) > div:nth-child(1) > img:nth-child(1)',
    }
}

module.exports = return_list();