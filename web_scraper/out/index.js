"use strict";
function print(data) {
    console.log(data);
}
class Page {
    url;
    containedUrls;
    constructor(url, containedUrls) {
        this.url = url;
        this.containedUrls = containedUrls;
    }
}
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
function fakeWebScrape(url) {
    const page = all.find((p) => p.url == url);
    if (page != null) {
        return page.containedUrls;
    }
    else {
        return [];
    }
}
function createPage(url) {
    return new Page(url, fakeWebScrape(url));
}
function main() {
    const webScrape = require('./web_scraper');
    webScrape('https://en.wikipedia.org/wiki/Among_Us');
}
main();
