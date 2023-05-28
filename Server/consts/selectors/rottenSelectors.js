function return_list() {
    return {
        searchList: '#search-results > search-page-result:nth-child(2) > ul:nth-child(4) > search-page-media-row',
        elementTitle: 'a:nth-child(2)',
        elementYear: '.year',
        elementRate: '.percentage'
    }
}

module.exports = return_list();