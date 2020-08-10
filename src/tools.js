const Apify = require('apify');

const {
    utils: { log },
} = Apify;

exports.getStartUrls = async () => {
    const input = await Apify.getInput();
    return input.startUrls;
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
    log.debug(results);
    await Apify.pushData(results);
};
