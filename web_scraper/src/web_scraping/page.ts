
class Page {
    public url: string; // the URL of this wiki page
    public containedUrls?: string[]; // the URLs that this wiki page has
    private path: string[];

    constructor(url: string, containedUrls?: string[]) {
        this.url = url;
        this.containedUrls = containedUrls;
        this.path = [];
    }

    async webScrape(completeRecord: string[]) {
        const ws = require('./web_scraper').webScrape;
        this.containedUrls = (await ws(this.url)).filter((url: string) => !completeRecord.includes(url));
    }

    setPath(path: string[]) {
        this.path.push(...path);
    }

    getPath() {
        return this.path;
    }

    fakeWebScrape(all: any[]) {
        const page = all.find((p) => p.url == this.url);
        if (page != null) {
            this.containedUrls = page.containedUrls;
        } else {
            this.containedUrls = [];
        }
    }
}

export default Page;