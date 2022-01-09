const webScrape = require('./web_scraper');


async function main() {
  const fs = require('fs');
  
  startURL = 'https://en.wikipedia.org/wiki/Professional';
  
  var link = {
    Links: []
  };

  const test = webScrape(startURL).then((result) => {
    var out = result.map(v => v.slice(30))
  
    fs.readFile('linksDB.json', function readFileCallback(err, data){
      if (err){
          console.log(err);
      } else {
        link = JSON.parse(data); //now it's an object
        link.Links.push({[startURL.slice(30)]: [...out]});  // Add the links to the link table
        json = JSON.stringify(link); //convert it back to json
        fs.writeFile('linksDB.json', json, function(err, link) {  // write it back 
          if(err) console.log('error', err);
        }); 
    }});

    
    
  });

  
}

main();





