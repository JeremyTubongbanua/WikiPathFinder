"use strict";
class Page {
    url; // the URL of this wiki page
    containedUrls; // the URLs that this wiki page has
    path;
    constructor(url, containedUrls) {
        this.url = url;
        this.containedUrls = containedUrls;
        this.path = [];
    }
    async webScrape(completeRecord) {
        const ws = require('./web_scraper').webScrape;
        this.containedUrls = (await ws(this.url)).filter((url) => !completeRecord.includes(url));
    }
    setPath(path) {
        this.path.push(...path);
    }
    getPath() {
        return this.path;
    }
    fakeWebScrape(all) {
        const page = all.find((p) => p.url == this.url);
        if (page != null) {
            this.containedUrls = page.containedUrls;
        }
        else {
            this.containedUrls = [];
        }
    }
}
module.exports = Page;
