// var fs = require('fs');

// var page;
// fs.open('offer.html', 'r', function (err, file) {
//   if (err) throw err;
//   page = file;
// });

// console.log(page);
var http = require('http');
var fs = require('fs'); 
var cheerio = require('cheerio');
var puppeteer = require('puppeteer');
// http.createServer(function (req, res) {
//   fs.readFile('offer.html', function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     res.end();
//   });
// }).listen(8080);
// fs.readFile('offer.html', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });


var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
  fs.readFile('offer.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(8080);
