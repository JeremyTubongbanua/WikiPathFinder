"use strict";
async function main() {
    const findPath = require('./web_scraper.js').findPath;
    const startUrl = 'https://en.wikipedia.org/wiki/My_Teen_Romantic_Comedy_SNAFU_(season_1)';
    const endUrl = 'https://en.wikipedia.org/wiki/Disguised_Toast';
    const maxChecks = 1000;
    const maxLayers = 5;
    const result = await findPath(startUrl, endUrl, maxChecks, maxLayers);
    console.log(result);
}
main();
