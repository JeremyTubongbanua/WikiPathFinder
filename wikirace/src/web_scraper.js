"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const page_1 = __importDefault(require("./page"));
;
// const rp = require('request-promise');
// @ts-ignore
const rp = __importStar(require("request-promise"));
// const Page = require('./page');
function print(data) {
    console.log(data);
}
async function webScrape(url) {
    const prefix = 'https://en.wikipedia.org';
    const request = await rp({ url: url, timeout: 300000, json: true, headers: { 'Connection': 'keep-alive' } });
    const $ = cheerio_1.default.load(request);
    const content = $('.mw-parser-output'); // . is class and # is id
    // print(content.html());
    const construct = [];
    await content.find('a').each((i, el) => {
        if (el.attribs != undefined) {
            const link = el.attribs.href;
            if (link != undefined) {
                const blackList = ['Wikipedia', 'File:', 'Template:', 'Help:', 'Special:'];
                var hasBlackList = false;
                blackList.forEach((val) => {
                    if (link.includes(val)) {
                        hasBlackList = true;
                    }
                });
                if (link.startsWith('/wiki') && !hasBlackList) {
                    // print(`${el.attribs.title} ${el.attribs.href}`);
                    construct.push(`${prefix}${link}`);
                    // return `${prefix}${link}`;
                }
            }
        }
    });
    return construct;
}
async function findPath(startUrl, endUrl, maxChecks, layerMax) {
    // SETTINGS ================================
    // const startUrl: string = 'A'; // FAKE
    // const start: Page = new Page(startUrl); // FAKE
    // const startUrl: string = 'https://en.wikipedia.org/wiki/Among_Us'; // REAL
    const start = new page_1.default(startUrl); //REAL
    // const endUrl: string = 'K'; // FAKE
    // const end: Page = new Page(endUrl); // FAKE
    // const endUrl: string = 'https://en.wikipedia.org/wiki/Video_game_development'; // REAL
    const end = new page_1.default(endUrl); // REAL
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
            // print(`PATH FOUND: [Clicks :${index}]`);
            // print(possibleFind.getPath());
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
                    print(`Checking inside ${checkingPage.url}`);
                    await checkingPage.webScrape(completeRecord); // REAL
                    // checkingPage.fakeWebScrape(all); // FAKE
                    for (let j = 0; j < checkingPage.containedUrls.length && !isFound; j++) {
                        const newPage = new page_1.default(checkingPage.containedUrls[j]);
                        if (construct.find((page) => page.url == newPage.url))
                            continue;
                        print(`Scraping [${index}][${i}/${Math.min(layer.length, maxChecks)}][${j}]: ${newPage.url}`);
                        newPage.setPath([...checkingPage.getPath(), newPage.url]);
                        construct.push(newPage);
                        if (newPage.url == end.url) {
                            print(`PATH FOUND: [Clicks: ${index + 1}]`);
                            // print(newPage.getPath());
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
module.exports.findPath = findPath;
module.exports.webScrape = webScrape;
