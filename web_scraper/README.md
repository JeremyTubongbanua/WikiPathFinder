# WikiPathFinder

WikiPathFinder is a tool that tells you the quickest path from `START_WKIPEDIA_URL` to `END_WIKIPEDIA_URL`.

# Table of Contents

-   [WikiPathFinder](#wikipathfinder)
-   [Table of Contents](#table-of-contents)
-   [For Users](#for-users)
    -   [Background](#background)
    -   [How to Use](#how-to-use)
    -   [Example Usage (with DCP)](#example-usage--with-dcp-)
    -   [Example Usage (without DCP)](#example-usage--without-dcp-)
-   [For Developers](#for-developers)
    -   [Installing Dependencies](#installing-dependencies)
    -   [Node Dependencies](#node-dependencies)
    -   [How we use DCP](#how-we-use-dcp)
        -   [Using DCP Pros:](#using-dcp-pros-)
        -   [Using DCP Cons:](#using-dcp-cons-)
        -   [Without DCP Pros:](#without-dcp-pros-)
        -   [Without DCP Cons:](#without-dcp-cons-)

# For Users

## Background

WikiRacing is a commonly known game where 2 people start at the same `START_WIKIPEDIA_URL` and try to get to the same `END_WIKIPEDIA_URL`. Whoever gets to `END_WIKIPEDIA_URL` the fastest is the winner.

## How to Use

1. Install all necessary node modules
-   cheerio (for web scraping): `npm i cheerio`
-   request-promise `npm i request-promise`
-   dcp: `npm i dcp-client`
-   prompt-sync `npm install prompt-sync`
-   require() function: `npm i --save-dev @types/node`
2. Start terminal program via `node out/index.js`
3. Enter start URL (eg: `https://en.wikipedia.org/wiki/Gamer`)
4. Enter end URL (eg: `https://en.wikipedia.org/wiki/Google`)
5. Use DCP (y/n) ? (eg: `y`)
6. Obtain results. (`[]` is path not found)

## Example Usage (with DCP)

[Using DCP]

1. Start terminal program via `node out/index.js`
2. Enter start URL (eg: `https://en.wikipedia.org/wiki/Gamer`)
3. Enter end URL (eg: `https://en.wikipedia.org/wiki/Google`)
4. Use DCP (y/n) ? (eg: `y`)
5. Obtain results.

![https://en.wikipedia.org/wiki/Gamer -> https://en.wikipedia.org/wiki/Google [Using DCP]](https://i.imgur.com/gON5TDS.png)

Result: \
START `https://en.wikipedia.org/wiki/Gamer` \
TO `https://en.wikipedia.org/wiki/Gamer` \
TO END `https://en.wikipedia.org/wiki/Google`

## Example Usage (without DCP)

[Without DCP]

1. Start terminal program via `node out/index.js`
2. Enter start URL (eg: `https://en.wikipedia.org/wiki/Among_Us`)
3. Enter end URL (eg: `https://en.wikipedia.org/wiki/University_of_Guelph`)
4. Use DCP (y/n) ? (eg: `n`)
5. Obtain results.

![https://en.wikipedia.org/wiki/Among_Us -> https://en.wikipedia.org/wiki/University_of_Guelph [Using DCP]](https://i.imgur.com/KLiZqhK.png)

Result \
START `https://en.wikipedia.org/wiki/Among_Us` \
TO `https://en.wikipedia.org/wiki/Cover_art` \
TO `https://en.wikipedia.org/wiki/Illustration` \
TO `https://en.wikipedia.org/wiki/Ben_Shneiderman` \
TO END `https://en.wikipedia.org/wiki/University_of_Guelph`

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

## How we use DCP

The original plan was to do all of the web scraping and run the findPath algorithm on DCP. However, we were told by a mentor that DCP could not use the internet. So we were severely limited with integrating DCP into our idea. So for now, we give the user 2 options (to use DCP and to not use DCP) where each have their own pros and cons:

### Using DCP Pros:

-   findPath algorithm is super fast

### Using DCP Cons:

-   Have to do all web-scraping on system beforehand because no internet access.
-   The way our algorithm works: it was either using 1 worker or 300+ workers (300+ is how many URLs are in the first wikipedia start page).

### Without DCP Pros:

-   Web Scraping is dynamic.
-   The user can enter any possible wikipedia links.

### Without DCP Cons:

-   Takes very long to path find
-   Web scraping speed is limited to user's system
