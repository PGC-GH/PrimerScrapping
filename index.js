const cheerio = require("cheerio");
const fs = require("fs");
const request = require("request");

let images = [];

request("https://www.minutouno.com/", (err, res, body) => {
  if (!err && res.statusCode == 200) {
    let $ = cheerio.load(body);
    $("img").each(function() {
      var urlImg = $(this).attr("src");
      if (urlImg.indexOf('adjuntos') != -1) {
        images.push(urlImg);
      }
    });
  }

  for(let i = 0; i < images.length; i++) {
    request(images[i]).pipe(fs.createWriteStream('img/' + i + '.jpg'));
  }

});
