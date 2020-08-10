const Apify = require('apify');

const {
    utils: { log },
} = Apify;

exports.getConfig = async () => {
    const input = await Apify.getInput();
    const { startUrls, proxyConfiguration } = input;
    return { startUrls, proxyConfiguration };
};

function getByTestIdHierarchy($, testIds) {
    const attrSelectors = testIds.map((testId) => `[data-testid="${testId}"]`);
    return $(attrSelectors.join(' '));
}

exports.handleTodaysWeather = async ({ request, $ }) => {
    log.debug('Scraping results.');
    const results = {
        url: request.url,
        title: $('title').text(),
        feelsLikeTemp: getByTestIdHierarchy($, ['TodaysDetailsHeader', 'TemperatureValue']).text(),
        tempUnits: getByTestIdHierarchy($, ['ctaButton']).find('span:nth-child(3)').text(),
    };

    log.debug('Pushing data to dataset.');
    await Apify.pushData(results);
};
