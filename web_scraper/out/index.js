"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webScrape = require('./web_scraper');
function print(data) {
    console.log(data);
}
class Page {
    url;
    containedUrls;
    path;
    constructor(url, containedUrls) {
        this.url = url;
        this.containedUrls = containedUrls;
        this.path = [];
    }
    async webScrape() {
        this.containedUrls = await webScrape(this.url);
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
const a = new Page('A', ['B', 'C']);
const b = new Page('B', ['D', 'E', 'K']);
const c = new Page('C', ['F', 'G']);
const d = new Page('D', ['H', 'I']);
const e = new Page('E', ['J']);
const f = new Page('F', ['J']);
const g = new Page('G', ['L', 'K']);
const h = new Page('H', []);
const i = new Page('I', []);
const j = new Page('J', ['K']);
const k = new Page('K', []);
const l = new Page('L', []);
const all = [a, b, c, d, e, f, g, h, i, j, k, l];
async function work() {
    const startUrl = 'https://en.wikipedia.org/wiki/Among_Us';
    const start = new Page(startUrl);
    const endUrl = 'https://en.wikipedia.org/wiki/University_of_Waterloo';
    const end = new Page(endUrl);
    const maxChecks = 400;
    start.setPath([startUrl]);
    end.setPath([endUrl]);
    const layers = [];
    const completeRecord = [];
    var isFound = false;
    var index = 0;
    layers.push([start]);
    while (!isFound) {
        const layer = layers[index];
        if (layer.length == 0)
            break;
        const possibleFind = layer.find((page) => page.url == end.url);
        if (possibleFind) {
            print("PATH FOUND");
            print(possibleFind.getPath());
            isFound = true;
        }
        else {
            var construct = [];
            for (let i = 0; i < layer.length && !isFound && i < maxChecks; i++) {
                const checkingPage = layer[i];
                if (!completeRecord.includes(checkingPage.url)) {
                    completeRecord.push(checkingPage.url);
                    await checkingPage.webScrape();
                    for (let j = 0; j < checkingPage.containedUrls.length && j < maxChecks && !isFound; j++) {
                        const newPage = new Page(checkingPage.containedUrls[j]);
                        print(`Scraping [${index}][${i}/${Math.min(layer.length, maxChecks)}][${j}]: ${newPage.url}`);
                        newPage.setPath([...checkingPage.getPath(), newPage.url]);
                        construct.push(newPage);
                        if (newPage.url == end.url) {
                            print("PATH FOUND");
                            print(newPage.getPath());
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
}
async function main() {
    work();
}
main();
