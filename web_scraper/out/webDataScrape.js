const webScrape = require('./web_scraper');

async function writeJSON(URL) {

  var linkJSON = { };
  const fs = require('fs');

  const test = webScrape(startURL).then((result) => {
    var out = result.map(v => v.slice(30))
  
    fs.readFile('linksDB.json', function readFileCallback(err, data){
      if (err){
          console.log(err);
      } else {
        linkJSON = JSON.parse(data); //now it's an object
        linkJSON[startURL.slice(30)] = [...out]
        json = JSON.stringify(linkJSON); //convert it back to json
        fs.writeFile('linksDB.json', json, function(err, linkJSON) {  // write it back 
          if(err) console.log('error', err);
        }); 
    }});
  });
  return;
}

async function main() {
  startURL = 'https://en.wikipedia.org/wiki/Subsidiary';
  console.log(startURL.slice(30));
  
  writeJSON(startURL)
  
}




function test() {
  var result = [];

  
  webScrape('https://en.wikipedia.org/wiki/Subsidiary').then((result) => {
    console.log(result);
    console.log("HI", result[0]);

    for (var i = 1; i <= 20; i++) {
      console.log("HI");
      var linkJSON = { };
      const fs = require('fs');

      const test = webScrape(result[i]).then((qoop) => {
        var out = qoop.map(v => v.slice(30))
      
        fs.readFile('wee.json', function readFileCallback(err, data){
          if (err){
              console.log(err);
          } else {
            linkJSON = JSON.parse(data); //now it's an object
            linkJSON[qoop[i].slice(30)] = [...out]
            json = JSON.stringify(linkJSON); //convert it back to json
            fs.writeFile('wee.json', json, function(err, linkJSON) {  // write it back 
              if(err) console.log('error', err);
            }); 
        }});
      });
    }

    webScrape(result[1]).then((eep) => {
      console.log("eep", eep);
    });
  }); 

}

test();