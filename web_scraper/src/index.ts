

async function main() {
    const findPath = require('./web_scraper.js').findPath;
    const startUrl: string = 'https://en.wikipedia.org/wiki/Among_Us';
    const endUrl: string = 'https://en.wikipedia.org/wiki/Deductive_reasoning';
    const maxChecks: number = 1000;
    const maxLayers: number = 5;
    const result: string[] = await findPath(startUrl, endUrl, maxChecks, maxLayers);
    console.log(result);
}

main();