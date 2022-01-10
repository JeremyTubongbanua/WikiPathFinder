import cheerio, { Element } from "cheerio";
import request from 'request-promise';
import Page from './page';

/**
 * Short cut for console logging
 * @param data object to print
 */
function print(data: any) {
    console.log(data);
}

/**
 * Get a list of wikipedia urls that are contained in url.
 * @param url Wikipedia page that you want to web scrape
 * @returns Promise<string[]> where string[] is a list of urls that is contained in url obtained through web scraping
 */
async function webScrape(url: string): Promise<string[]> {
    const prefix: string = 'https://en.wikipedia.org';
    //@ts-ignore
    const req = await request({ url: url, timeout: 300000, json: true, headers: { 'Connection': 'keep-alive' } });
    const $ = cheerio.load(req);
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

/**
 * Find the quickest possible path to get from startUrl to endUrl by only clicking wikipedia links
 * @param startUrl Start wikipedia page (eg: 'https://en.wikipedia.org/wiki/My_Youth_Romantic_Comedy_Is_Wrong,_As_I_Expected')
 * @param endUrl End wikipedia page (eg: 'https://en.wikipedia.org/wiki/Japan')
 * @param maxChecks amount of url checks it will make per web scrape
 * @param layerMax amount of layers it will go through before giving up
 * @param debugMode will print web scrape console 
 * @returns a path to get from startUrl to endUrl
 * string[] eg: ['https://en.wikipedia.org/wiki/My_Youth_Romantic_Comedy_Is_Wrong,_As_I_Expected', 'https://en.wikipedia.org/wiki/Japan']
 */
async function findPath(startUrl: string, endUrl: string, maxChecks: number, layerMax: number, debugMode: boolean = false): Promise<string[] | null> {
    const start: Page = new Page(startUrl); // Page object for first wikipedia url
    const end: Page = new Page(endUrl);
    start.setPath([startUrl]);
    end.setPath([endUrl]);

    const layers: Page[][] = [];
    const completeRecord: string[] = [];
    var isFound: boolean = false;
    var index: number = 0;
    var foundPath: string[] | null = null;

    layers.push([start]);

    while (!isFound && index <= layerMax) {
        const layer: Page[] = layers[index];
        if (layer.length == 0) break;
        const possibleFind: Page | undefined = layer.find((page) => page.url == end.url);
        if (possibleFind) {
            foundPath = possibleFind.getPath();
            isFound = true;
        } else {
            // create next layer
            var construct: Page[] = [];
            for (let i: number = 0; i < Math.min(layer.length, maxChecks) && !isFound; i++) {
                const checkingPage: Page = layer[i];
                if (!completeRecord.includes(checkingPage.url)) {
                    completeRecord.push(checkingPage.url);
                    print(`Checking inside ${checkingPage.url}`);
                    await checkingPage.webScrape(completeRecord); // REAL
                    // checkingPage.fakeWebScrape(all); // FAKE
                    for (let j: number = 0; j < checkingPage.containedUrls!.length && !isFound; j++) {
                        const newPage: Page = new Page(checkingPage.containedUrls![j]);
                        if (construct.find((page) => page.url == newPage.url)) continue;
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

export { findPath, webScrape };