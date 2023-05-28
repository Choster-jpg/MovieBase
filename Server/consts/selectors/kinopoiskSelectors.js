function return_list() {
    return {
        rate: 'div.element:nth-child(2) > div:nth-child(1) > div:nth-child(1)',
        year: 'div.element:nth-child(2) > div:nth-child(3) > p:nth-child(1) > span:nth-child(2)',
        engName: 'div.element:nth-child(2) > div:nth-child(3) > span:nth-child(2)',
    }
}

module.exports = return_list();