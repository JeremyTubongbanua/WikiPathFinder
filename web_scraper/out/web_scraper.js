"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const rp = require('request-promise');
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
module.exports = webScrape;
