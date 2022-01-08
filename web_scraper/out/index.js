"use strict";
const webScrape = require('./web_scraper');
function print(data) {
    console.log(data);
}
class Page {
    url;
    containedUrls;
    constructor(url, containedUrls) {
        this.url = url;
        if (containedUrls == undefined) {
            this.containedUrls = webScrape(url);
        }
        else {
            this.containedUrls = containedUrls;
        }
    }
}
function work() {
    const startUrl = 'https://en.wikipedia.org/wiki/Among_Us';
    const start = new Page(startUrl);
    const endUrl = 'https://en.wikipedia.org/wiki/Mafia_(party_game)';
    const end = new Page(endUrl);
    const layers = [];
    var isFound = false;
    var index = 0;
    while (!isFound) {
        const layer = layers[index];
        if (layer.find((page) => page.url == end.url)) {
            isFound = true;
        }
        else {
            var construct = [];
            for (let i = 0; i < layer.length; i++) {
                for (let j = 0; j < layer[i].containedUrls.length; j++) {
                    const newPage = new Page(layer[i].containedUrls[j]);
                    construct.push(newPage);
                }
            }
            layers.push(construct);
            index++;
        }
    }
}
async function main() {
    const webScraped = await webScrape('https://en.wikipedia.org/wiki/Among_Us');
    print(webScraped.length);
}
main();
