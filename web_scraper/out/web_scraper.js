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
    const request = await rp(url);
    const $ = cheerio_1.default.load(request);
    const content = $('.mw-parser-output');
    const construct = [];
    await content.find('a').each((i, el) => {
        if (el.attribs != undefined) {
            const link = el.attribs.href;
            if (link.startsWith('/')) {
                construct.push(`${prefix}${link}`);
            }
        }
    });
    return construct;
}
module.exports = webScrape;
