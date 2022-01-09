# WikiPathFinder

WikiPathFinder is a tool that tells you the quickest path from `START_WKIPEDIA_URL` to `END_WIKIPEDIA_URL`.

# For Users

## Background

WikiRacing is a commonly known game where 2 people start at the same `START_WIKIPEDIA_URL` and try to get to the same `END_WIKIPEDIA_URL`. Whoever gets to `END_WIKIPEDIA_URL` the fastest is the winner.

## How to Use

1. Start terminal program via `node out/index.js`
2. Enter start URL (eg: `https://en.wikipedia.org/wiki/Gamer`)
3. Enter end URL (eg: `https://en.wikipedia.org/wiki/Google`)
4. Use DCP (y/n) ? (eg: `y`)
5. Obtain results. (`[]` is path not found)

## Example Usage (with DCP)

![https://en.wikipedia.org/wiki/Gamer -> https://en.wikipedia.org/wiki/Google [Using DCP]](https://imgur.com/beutg6Q)

## Example Usage (without DCP)

![https://en.wikipedia.org/wiki/Among_Us -> https://en.wikipedia.org/wiki/University_of_Guelph [Using DCP]](https://imgur.com/KLiZqhK)

# For Developers

## Installing Dependencies

-   Update all dependencies listed in package.json: `npm install`

## Node Dependencies

If `npm install` doesn't work:

-   type script `npm i -g type-script`
-   cheerio (for web scraping): `npm i cheerio`
-   require() function: `npm i --save-dev @types/node`
-   request-promise `npm i request-promise`
-   dcp: `npm i dcp-client`
-   prompt-sync `npm install prompt-sync`
