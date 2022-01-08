import cheerio, { Element } from "cheerio";
// import { request } from "request";
const request = require('request');

function print(data: any) {
    console.log(data);
}

async function webScrape(url: string): Promise<string[]> {
    const prefix = 'https://en.wikipedia.org';
    var construct: string[] = [];
    request(url, (err: any, res: any, html: any) => {
        // print(`${err} ${res} ${html}`);
        if (!err && res.statusCode < 400) {
            const $ = cheerio.load(html);
            const content = $('.mw-parser-output'); // . is class and # is id
            // print(content.html());
            content.find('a').each((i: number, el: Element) => {
                if (el.attribs != undefined) {
                    const link: string = el.attribs.href;
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