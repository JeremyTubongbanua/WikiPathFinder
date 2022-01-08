

async function main() {
    const findPath = require('./web_scraper.js').findPath;
    const startUrl: string = 'https://en.wikipedia.org/wiki/Among_Us';
    const endUrl: string = 'https://en.wikipedia.org/wiki/Video_game_development';
    const maxChecks: number = 20;
    const maxLayers: number = 5;
    const result: string[] = await findPath(startUrl, endUrl, maxChecks, maxLayers);
    console.log(result);
}

main();