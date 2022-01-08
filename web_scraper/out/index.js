"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webScrape = require('./web_scraper');
function print(data) {
    console.log(data);
}
class Page {
    url; // the URL of this wiki page
    containedUrls; // the URLs that this wiki page has
    path;
    constructor(url, containedUrls) {
        this.url = url;
        this.containedUrls = containedUrls;
        this.path = [];
    }
    async webScrape(completeRecord) {
        this.containedUrls = (await webScrape(this.url)).filter((url) => !completeRecord.includes(url));
    }
    setPath(path) {
        this.path.push(...path);
    }
    getPath() {
        return this.path;
    }
    fakeWebScrape(all) {
        const page = all.find((p) => p.url == this.url);
        if (page != null) {
            this.containedUrls = page.containedUrls;
        }
        else {
            this.containedUrls = [];
        }
    }
}
exports.default = Page;
// DUMMY DATA
const a = new Page('A', ['B', 'C']); // start
const b = new Page('B', ['D', 'E', 'K']);
const c = new Page('C', ['F', 'G']);
const d = new Page('D', ['H', 'I']);
const e = new Page('E', ['J']);
const f = new Page('F', ['J']);
const g = new Page('G', ['L', 'K']);
const h = new Page('H', []);
const i = new Page('I', []);
const j = new Page('J', ['K']);
const k = new Page('K', []); // finish
const l = new Page('L', []);
const all = [a, b, c, d, e, f, g, h, i, j, k, l];
async function findPath(startUrl, endUrl, maxChecks, layerMax) {
    // SETTINGS ================================
    // const startUrl: string = 'A'; // FAKE
    // const start: Page = new Page(startUrl); // FAKE
    // const startUrl: string = 'https://en.wikipedia.org/wiki/Among_Us'; // REAL
    const start = new Page(startUrl); //REAL
    // const endUrl: string = 'K'; // FAKE
    // const end: Page = new Page(endUrl); // FAKE
    // const endUrl: string = 'https://en.wikipedia.org/wiki/Video_game_development'; // REAL
    const end = new Page(endUrl); // REAL
    // const maxChecks: number = 50; // DEBUG
    // const maxChecks: number = 1000; // REAL (for now)
    // SETTINGS ================================
    start.setPath([startUrl]);
    end.setPath([endUrl]);
    const layers = [];
    const completeRecord = [];
    var isFound = false;
    var index = 0;
    var foundPath = null;
    layers.push([start]);
    while (!isFound && index <= layerMax) {
        const layer = layers[index];
        // print(`Layer [${index}]: ${layer.map((page) => page.url)}`);
        if (layer.length == 0)
            break;
        const possibleFind = layer.find((page) => page.url == end.url);
        if (possibleFind) {
            // check current layer
            print(`PATH FOUND: [Clicks :${index}]`);
            print(possibleFind.getPath());
            foundPath = possibleFind.getPath();
            isFound = true;
        }
        else {
            // create next layer
            var construct = [];
            for (let i = 0; i < Math.min(layer.length, maxChecks) && !isFound; i++) {
                const checkingPage = layer[i];
                if (!completeRecord.includes(checkingPage.url)) {
                    completeRecord.push(checkingPage.url);
                    await checkingPage.webScrape(completeRecord); // REAL
                    // checkingPage.fakeWebScrape(all); // FAKE
                    for (let j = 0; j < Math.min(checkingPage.containedUrls.length, maxChecks) && !isFound; j++) {
                        const newPage = new Page(checkingPage.containedUrls[j]);
                        if (construct.find((page) => page.url == newPage.url))
                            continue;
                        print(`Scraping [${index}][${i}/${Math.min(layer.length, maxChecks)}][${j}]: ${newPage.url}`);
                        newPage.setPath([...checkingPage.getPath(), newPage.url]);
                        construct.push(newPage);
                        if (newPage.url == end.url) {
                            print(`PATH FOUND: [Clicks :${index + 1}]`);
                            print(newPage.getPath());
                            foundPath = newPage.getPath();
                            isFound = true;
                            break;
                        }
                    }
                }
            }
            layers.push(construct);
            index++;
        }
    }
    return foundPath;
}
module.exports = findPath;
