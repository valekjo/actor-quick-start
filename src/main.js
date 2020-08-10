const Apify = require('apify');
const tools = require('./tools');

const {
    utils: { log },
} = Apify;

Apify.main(async () => {
    const { startUrls, proxyConfiguration } = await tools.getConfig();
    const requestList = new Apify.RequestList({ sources: startUrls });
    await requestList.initialize();

    log.debug('Setting up crawler.');
    const crawler = new Apify.CheerioCrawler({
        requestList,
        handlePageFunction: tools.handleTodaysWeather,
        proxyConfiguration,
    });

    log.info('Starting the crawl.');
    await crawler.run();
    log.info('Actor finished.');
});
