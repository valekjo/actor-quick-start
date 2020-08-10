const Apify = require('apify');
const tools = require('./tools');

const {
    utils: { log },
} = Apify;

Apify.main(async () => {
    log.info('Starting actor.');
    const requestList = await Apify.openRequestList('start-urls', await tools.getStartUrls());

    log.debug('Setting up crawler.');
    const crawler = new Apify.CheerioCrawler({
        requestList,
        handlePageFunction: tools.handleTodaysWeather,
    });

    log.info('Starting the crawl.');
    await crawler.run();
    log.info('Actor finished.');
});
