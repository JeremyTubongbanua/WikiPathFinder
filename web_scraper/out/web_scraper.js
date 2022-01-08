"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const request = require('request');
function print(data) {
    console.log(data);
}
async function webScrape(url) {
    const prefix = 'https://en.wikipedia.org';
    var construct = [];
    request(url, (err, res, html) => {
        if (!err && res.statusCode < 400) {
            const $ = cheerio_1.default.load(html);
            const content = $('.mw-parser-output');
            content.find('a').each((i, el) => {
                if (el.attribs != undefined) {
                    const link = el.attribs.href;
                    if (link.startsWith('/')) {
                        print(`${el.attribs.title} ${el.attribs.href}`);
                        construct.push(`${prefix}${link}`);
                    }
                }
            });
        }
    });
    return construct;
}
module.exports = webScrape;
