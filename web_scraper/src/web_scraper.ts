import cheerio, { Element } from "cheerio";
const rp = require('request-promise');

function print(data: any) {
    console.log(data);
}

async function webScrape(url: string): Promise<any> {
    const prefix: string = 'https://en.wikipedia.org';
    const request = await rp(url);
    const $ = cheerio.load(request);
    const content = $('.mw-parser-output'); // . is class and # is id
    // print(content.html());
    const construct: string[] = [];
    await content.find('a').each((i: number, el: Element) => {
        if (el.attribs != undefined) {
            const link: string = el.attribs.href;
            if (link.startsWith('/')) {
                // print(`${el.attribs.title} ${el.attribs.href}`);
                construct.push(`${prefix}${link}`);
                // return `${prefix}${link}`;
            }
        }

    });
    return construct;

}


module.exports = webScrape;