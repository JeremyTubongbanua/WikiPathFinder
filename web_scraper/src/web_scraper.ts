import cheerio, { Element } from "cheerio";
import Page from "./index";
const rp = require('request-promise');

function print(data: any) {
    console.log(data);
}

async function webScrape(url: string): Promise<string[]> {
    const prefix: string = 'https://en.wikipedia.org';
    const request = await rp({ url: url, timeout: 300000, json: true, headers: { 'Connection': 'keep-alive' } });
    const $ = cheerio.load(request);
    const content = $('.mw-parser-output'); // . is class and # is id
    // print(content.html());
    const construct: string[] = [];
    await content.find('a').each((i: number, el: Element) => {
        if (el.attribs != undefined) {
            const link: string = el.attribs.href;
            if (link != undefined) {
                const blackList: string[] = ['Wikipedia', 'File:', 'Template:', 'Help:', 'Special:']
                var hasBlackList: boolean = false;
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