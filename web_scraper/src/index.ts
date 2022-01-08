const webScrape = require('./web_scraper');


function print(data: any) {
    console.log(data);
}

class Page {
    public url: string; // the URL of this wiki page
    public containedUrls: string[]; // the URLs that this wiki page has

    constructor(url: string, containedUrls?: string[]) {
        this.url = url;
        if (containedUrls == undefined) {
            this.containedUrls = webScrape(url);
        } else {
            this.containedUrls = containedUrls;
        }
    }
}

// // DUMMY DATA
// const a: Page = new Page('A', ['B', 'C']);      // start
// const b: Page = new Page('B', ['D', 'E', 'K']);
// const c: Page = new Page('C', ['F', 'G']);
// const d: Page = new Page('D', ['H', 'I']);
// const e: Page = new Page('E', ['J']);
// const f: Page = new Page('F', ['J']);
// const g: Page = new Page('G', ['L', 'K']);
// const h: Page = new Page('H', []);
// const i: Page = new Page('I', []);
// const j: Page = new Page('J', ['K']);
// const k: Page = new Page('K', []);              // finish
// const l: Page = new Page('L', []);
// const all: Page[] = [a, b, c, d, e, f, g, h, i, j, k, l];

// function fakeWebScrape(url: string): string[] {
//     const page: Page | undefined = all.find((p) => p.url == url);
//     if (page != null) {
//         return page.containedUrls;
//     } else {
//         return [];
//     }
// }

// function createPage(url: string): Page {
//     // DUMMY CODE
//     return new Page(url, fakeWebScrape(url));
// }


function work() {
    const startUrl: string = 'https://en.wikipedia.org/wiki/Among_Us';
    const start: Page = new Page(startUrl);

    const endUrl: string = 'https://en.wikipedia.org/wiki/Mafia_(party_game)';
    const end: Page = new Page(endUrl);

    const layers: Page[][] = [];
    var isFound: boolean = false;
    var index: number = 0;

    while (!isFound) {
        const layer: Page[] = layers[index];

        if (layer.find((page) => page.url == end.url)) {
            // check current layer
            isFound = true;
        } else {
            // create next layer
            var construct: Page[] = [];
            for (let i: number = 0; i < layer.length; i++) {
                for (let j: number = 0; j < layer[i].containedUrls.length; j++) {
                    const newPage: Page = new Page(layer[i].containedUrls[j]);
                    construct.push(newPage);
                }
            }
            layers.push(construct);

            index++;
        }
    }
}

async function main() {

    const webScraped = await webScrape('https://en.wikipedia.org/wiki/Among_Us');
    print(webScraped);

}

main();