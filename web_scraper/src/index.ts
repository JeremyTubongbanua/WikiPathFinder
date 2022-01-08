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

    async webScrape(completeRecord: string[]) {
        this.containedUrls = (await webScrape(this.url)).filter((url: string) => !completeRecord.includes(url));
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


async function findPath(startUrl: string, endUrl: string, maxChecks: number, layerMax: number): Promise<string[] | null> {
    // SETTINGS ================================

    // const startUrl: string = 'A'; // FAKE
    // const start: Page = new Page(startUrl); // FAKE
    // const startUrl: string = 'https://en.wikipedia.org/wiki/Among_Us'; // REAL
    const start: Page = new Page(startUrl); //REAL

    // const endUrl: string = 'K'; // FAKE
    // const end: Page = new Page(endUrl); // FAKE
    // const endUrl: string = 'https://en.wikipedia.org/wiki/Video_game_development'; // REAL
    const end: Page = new Page(endUrl); // REAL

    // const maxChecks: number = 50; // DEBUG
    // const maxChecks: number = 1000; // REAL (for now)

    // SETTINGS ================================

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
        // print(`Layer [${index}]: ${layer.map((page) => page.url)}`);
        if (layer.length == 0) break;
        const possibleFind: Page | undefined = layer.find((page) => page.url == end.url);
        if (possibleFind) {
            // check current layer
            print(`PATH FOUND: [Clicks :${index}]`);
            print(possibleFind.getPath());
            foundPath = possibleFind.getPath();
            isFound = true;
        } else {
            // create next layer
            var construct: Page[] = [];
            for (let i: number = 0; i < Math.min(layer.length, maxChecks) && !isFound; i++) {
                const checkingPage: Page = layer[i];
                if (!completeRecord.includes(checkingPage.url)) {
                    completeRecord.push(checkingPage.url);
                    await checkingPage.webScrape(completeRecord); // REAL
                    // checkingPage.fakeWebScrape(all); // FAKE
                    for (let j: number = 0; j < Math.min(checkingPage.containedUrls!.length, maxChecks) && !isFound; j++) {
                        const newPage: Page = new Page(checkingPage.containedUrls![j]);
                        if (construct.find((page) => page.url == newPage.url)) continue;
                        print(`Scraping [${index}][${i}/${Math.min(layer.length, maxChecks)}][${j}]: ${newPage.url}`);
                        newPage.setPath([...checkingPage.getPath(), newPage.url]);
                        construct.push(newPage);
                        if (newPage.url == end.url) {
                            print(`PATH FOUND: [Clicks :${index + 1}]`);
                            print(newPage.getPath());
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

module.exports = findPath;