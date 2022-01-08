

async function main() {
    const findPath = require('./web_scraper.js').findPath;
    const startUrl: string = 'https://en.wikipedia.org/wiki/My_Teen_Romantic_Comedy_SNAFU_(season_1)';
    const endUrl: string = 'https://en.wikipedia.org/wiki/Disguised_Toast';
    const maxChecks: number = 1000;
    const maxLayers: number = 5;
    const result: string[] = await findPath(startUrl, endUrl, maxChecks, maxLayers);
    console.log(result);
}

main();