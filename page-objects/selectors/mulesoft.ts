
export  const navigationSelectors = {

}

export  const homepageSelectors = {
    banner:'//div[contains(@class, \'component-banner\') and contains(@class, \'component-banner-br-view-mode-f\')]'
}

export  const loginSelectors ={
    acceptAllCookies: '//button[@id=\'onetrust-accept-btn-handler\']'
}

export  const navResourcesSelectors ={
    webinars:'//a[contains(@class, \'resources-title\') and normalize-space(.) = \'Webinars\']',
    demos:'//a[contains(@class, \'resources-title\') and normalize-space(.) = \'Demos\']',
    videos:'//a[contains(@class, \'resources-title\') and normalize-space(.) = \'Videos\']',
    reports:'//a[contains(@class, \'resources-title\') and normalize-space(.) = \'Analyst reports\']',
    ebooks:'//a[contains(@class, \'resources-title\') and normalize-space(.) = \'eBooks\']',
    whitepapers:'//a[contains(@class, \'resources-title\') and normalize-space(.) = \'Whitepapers\']',
    infographics:'//a[contains(@class, \'resources-title\') and normalize-space(.) = \'Infographics\']',
    articles:'//a[contains(@class, \'resources-title\') and normalize-space(.) = \'Articles\']',
    blog:'//a[contains(@class, \'resources-title\') and normalize-space(.) = \'Blog\']',
    apiUniversity:'//a[contains(@class, \'resources-title\') and normalize-space(.) = \'API University\']',
    selectAllResources: '//a[text()="See all resources"]'
}

export  const navProductsSelectors ={

}

export  const navSolucionsSelectors ={

}

export  const navServicesSelectors ={

}

export const megaMenuSelectors ={
    resources: '//span[@class="main-menu-resources"]'
}


export  const resourcesSelectors = {
    bannerTiles: '.banner-tiles',
    allTiles: '//div[contains(@class, "resources-app")]',
    btnFilter: '.filters-trigger',
    searchBox: '.sk-search-box__text',
    clearAllBtn: '.sk-reset-filters__reset',
    tiles: '.component-tile',
    closeFilter: '.close-filters-container',
    spinner: '.sk-spinning-loader'
}

export const filterResourcesSelectors ={
    resources: '//span[@class="main-menu-resources"]',
    legacySystem: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'Legacy system modernization\']',
    businessAutomation: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'Business automation\']',
    singleView: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'Single view of customer\']',
    cloudIntegration: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'Cloud integration\']',
    saasIntegration: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'SaaS integration\']',
    hybridintegration: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'Hybrid integration\']',
    onmichannel: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'Omnichannel\']',
    ecommers: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'eCommerce\']',
    mobile: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'Mobile\']',
    financialServices: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'Financial services\']',
    retail: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'Retail\']',
    healthcare: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'Healthcare\']',
    government: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'Government\']',
    manufacturing: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'Manufacturing\']',
    insurance: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'Insurance\']',
    comAndMedia: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'Communications and Media\']',
    highTech: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'High Tech\']',
    transportation: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'Transportation and logistics\']',
    education: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'Education\']',
    apis: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'APIs\']',
    salesforce: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'Salesforce\']',
    microservices: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'Microservices\']',
    devops: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'DevOps\']',
    b2b: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'B2B/EDI\']',
    esb: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'ESB\']',
    sao: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'SOA\']',
    webinar: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'Webinar\']',
    whitepapers: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'Whitepaper\']',
    demo: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'Demo\']',
    reports: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'Report\']',
    ebook: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'eBook\']',
    infographics: '//div[contains(@class, \'sk-item-list-option__text\') and normalize-space(.) = \'Infographic\']',
    filterOption: (option: string) => `//div[contains(@class, 'sk-item-list-option__text') and text()='${option}']`,
    foundingShowing: '//div[@data-qa="info"]',
    filterOptions: '.sk-item-list-option__text',
    filterOptionSelected: '.sk-filter-group-items__value',


}



