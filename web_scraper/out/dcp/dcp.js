"use strict";
async function dcp(start, end, linksW) {
    // var links: any = {
    //     'A': ['B', 'C'],
    //     'B': ['D', 'E'],
    //     'C': ['F', 'G'],
    //     'D': ['H', 'I'],
    //     'E': ['J'],
    //     'F': ['J'],
    //     'G': ['L', 'K'],
    //     'H': [],
    //     'I': [],
    //     'K': [],
    //     'L': [],
    // };
    // findPath(startUrl, endUrl, 100);
    const compute = require('dcp/compute');
    /* WORK FUNCTION */
    async function workFn(startUrl, endUrl, wikipediaPages, maxLayers) {
        // @ts-ignore
        progress();
        function findPath(startUrl, endUrl, wikipediaPages, maxLayers) {
            var isFound = false;
            var index = 0;
            var foundPath = [];
            var alreadyChecked = [];
            const layers = [];
            layers.push([{ url: startUrl, urls: [...wikipediaPages[startUrl]], cameFrom: [] }]);
            while (!isFound) {
                const pageObjsToCheck = layers[index];
                if (pageObjsToCheck.length == 0)
                    break;
                // check if this layers' children has endUrl
                for (let i = 0; i < pageObjsToCheck.length; i++) {
                    const pageObjToCheck = pageObjsToCheck[i];
                    if (pageObjToCheck.url == endUrl) {
                        foundPath = [...pageObjToCheck.cameFrom, endUrl];
                        isFound = true;
                        break;
                    }
                    // if (pageObjToCheck.urls.includes(endUrl)) {
                    //     foundPath = [...pageObjToCheck.cameFrom, endUrl];
                    //     isFound = true;
                    //     break;
                    // }
                }
                // build next layer
                const construct = [];
                for (let i = 0; i < pageObjsToCheck.length; i++) {
                    const pageObjToCheck = pageObjsToCheck[i];
                    const urlsToCheck = pageObjToCheck.urls;
                    for (let j = 0; j < urlsToCheck.length; j++) {
                        const urlToCheck = urlsToCheck[j];
                        if (wikipediaPages[urlToCheck] != undefined && !alreadyChecked.includes(urlToCheck)) {
                            alreadyChecked.push(urlToCheck);
                            const newPageObj = { url: urlToCheck, urls: wikipediaPages[urlToCheck], cameFrom: [...pageObjToCheck.cameFrom, pageObjToCheck.url] };
                            construct.push(newPageObj);
                        }
                    }
                }
                layers.push(construct);
                index++;
                if (index > maxLayers) {
                    break;
                }
            }
            // print(foundPath);
            return foundPath.length == 0 ? [] : foundPath;
        }
        // var results = [];
        // for (let i = 0; i < startUrls.length; i++) {
        //     var url = startUrls[i];
        //     results.push(findPath(url, endUrl, wikipediaPages, maxLayers));
        // }
        return findPath(startUrl, endUrl, wikipediaPages, maxLayers);
        // return [startUrl]
    }
    ;
    /* COMPUTE FOR */
    // const job = compute.for(inputSet, workFn, ['K', {
    //     'A': ['B', 'C'],
    //     'B': ['D', 'E'],
    //     'C': ['F', 'G'],
    //     'D': ['H', 'I'],
    //     'E': ['J'],
    //     'F': ['J'],
    //     'G': ['L', 'K'],
    //     'H': [],
    //     'I': [],
    //     'K': [],
    //     'L': [],
    // }, 7]);
    // console.log(inputSet);
    // console.log(end);
    // console.log(linksW[start]);
    const inputSet = [start];
    const job = compute.for(inputSet, workFn, [end, linksW, 1000]);
    job.public.name = 'wikiRace';
    // SKIP IF: you do not need a compute group
    job.computeGroups = [{ joinKey: 'hackathon', joinSecret: 'dcp2021' }];
    // Not mandatory console logs for status updates
    job.on('accepted', () => {
        console.log(` - Job accepted with id: ${job.id}`);
    });
    job.on('result', (ev) => {
        console.log(` - Received result`);
        console.log(ev);
    });
    /* PROCESS RESULTS */
    console.log('Started job.exec()');
    let resultSet = await job.exec();
    const result = Array.from(resultSet).length >= 1 ? Array.from(resultSet)[0] : [];
    console.log(result);
    console.log(' - Job Complete');
    return result;
}
/**
 *
 * @param start Start URL (string) Eg: 'URL1'
 * @param end  End Desired Wikipedia URL (string) Eg: 'URL2'
 * @param linksW JSON Object of wikipedia pages Eg: {'URL1': [urls...], 'URL2': [urls...]}
 * @returns
 */
async function runDcp(start, end, linksW) {
    await require('dcp-client').init('https://scheduler.distributed.computer');
    const r = await dcp(start, end, linksW);
    return r;
    // require('dcp-client').init('https://scheduler.distributed.computer');
    // dcp(start, end, linksW)
}
module.exports.runDcp = runDcp;
