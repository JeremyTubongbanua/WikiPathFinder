"use strict";
async function main() {
    const findPath = require('./web_scraper.js').findPath;
    const startUrl = 'https://en.wikipedia.org/wiki/Among_Us';
    const endUrl = 'https://en.wikipedia.org/wiki/Video_game_development';
    const result = await findPath(startUrl, endUrl, 20, 2);
    console.log(result);
}
main();
