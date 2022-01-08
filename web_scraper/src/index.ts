import { stat } from "fs";

const webScrape = require('./web_scraper');


function print(data: any) {
    console.log(data);
}

export default class Page {
    public url: string; // the URL of this wiki page
    public containedUrls?: string[]; // the URLs that this wiki page has
    private path: string[];

    constructor(url: string, containedUrls?: string[]) {
        this.url = url;
        this.containedUrls = containedUrls;
        this.path = [];
    }

    async webScrape() {
        this.containedUrls = await webScrape(this.url);
    }

    setPath(path: string[]) {
        this.path.push(...path);
    }

    getPath() {
        return this.path;
    }

    fakeWebScrape(all: Page[]) {
        const page: Page | undefined = all.find((p) => p.url == this.url);
        if (page != null) {
            this.containedUrls = page.containedUrls;
        } else {
            this.containedUrls = [];
        }
    }
}

// DUMMY DATA
const a: Page = new Page('A', ['B', 'C']);      // start
const b: Page = new Page('B', ['D', 'E', 'K']);
const c: Page = new Page('C', ['F', 'G']);
const d: Page = new Page('D', ['H', 'I']);
const e: Page = new Page('E', ['J']);
const f: Page = new Page('F', ['J']);
const g: Page = new Page('G', ['L', 'K']);
const h: Page = new Page('H', []);
const i: Page = new Page('I', []);
const j: Page = new Page('J', ['K']);
const k: Page = new Page('K', []);              // finish
const l: Page = new Page('L', []);
const all: Page[] = [a, b, c, d, e, f, g, h, i, j, k, l];


async function work() {
    // SETTINGS ================================

    // const startUrl: string = 'A'; // FAKE
    // const start: Page = new Page(startUrl); // FAKE
    const startUrl: string = 'https://en.wikipedia.org/wiki/Among_Us'; // REAL
    const start: Page = new Page(startUrl); //REAL

    // const endUrl: string = 'K'; // FAKE
    // const end: Page = new Page(endUrl); // FAKE
    const endUrl: string = 'https://en.wikipedia.org/wiki/Comic_book'; // REAL
    const end: Page = new Page(endUrl); // REAL

    const maxChecks: number = 75; // DEBUG
    // const maxChecks: number = 1000; // REAL (for now)

    // SETTINGS ================================

    start.setPath([startUrl]);
    end.setPath([endUrl]);


    const layers: Page[][] = [];
    const completeRecord: string[] = [];
    var isFound: boolean = false;
    var index: number = 0;

    layers.push([start]);

    while (!isFound) {
        const layer: Page[] = layers[index];
        // print(`Layer [${index}]: ${layer.map((page) => page.url)}`);
        if (layer.length == 0) break;
        const possibleFind: Page | undefined = layer.find((page) => page.url == end.url);
        if (possibleFind) {
            // check current layer
            print("PATH FOUND");
            print(possibleFind.getPath());
            isFound = true;
        } else {
            // create next layer
            var construct: Page[] = [];
            for (let i: number = 0; i < layer.length && !isFound && i < maxChecks; i++) {
                const checkingPage: Page = layer[i];
                if (!completeRecord.includes(checkingPage.url)) {
                    completeRecord.push(checkingPage.url);
                    await checkingPage.webScrape(); // REAL
                    // checkingPage.fakeWebScrape(all); // FAKE
                    for (let j: number = 0; j < checkingPage.containedUrls!.length && j < maxChecks && !isFound; j++) {
                        const newPage: Page = new Page(checkingPage.containedUrls![j]);
                        // if (!completeRecord.includes(newPage.url)) {
                        // completeRecord.push(newPage.url);
                        print(`Scraping [${index}][${i}/${Math.min(layer.length, maxChecks)}][${j}]: ${newPage.url}`);
                        // newPage.fakeWebScrape(all); // FAKE
                        // newPage.webScrape(); // REAL
                        newPage.setPath([...checkingPage.getPath(), newPage.url]);
                        construct.push(newPage);
                        if (newPage.url == end.url) {
                            print("PATH FOUND");
                            print(newPage.getPath()); // DEBUG
                            isFound = true;
                            break;
                        }
                        // }
                    }
                }
            }
            layers.push(construct);
            index++;
        }
    }
    // print(layers);

}

async function main() {
    // const webScraped = await webScrape('https://en.wikipedia.org/wiki/Among_Us');
    // print(webScraped);
    work();
}

main();