"use strict";
async function main() {
    const findPath = require('./web_scraper.js').findPath;
    const startUrl = 'https://en.wikipedia.org/wiki/Among_Us';
    const endUrl = 'https://en.wikipedia.org/wiki/Deductive_reasoning';
    const maxChecks = 1000;
    const maxLayers = 5;
    const result = await findPath(startUrl, endUrl, maxChecks, maxLayers);
    console.log(result);
}
main();
