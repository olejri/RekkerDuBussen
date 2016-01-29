var express = require('express');
jsdom = require("jsdom");
$ = require('jquery')(jsdom.jsdom().defaultView);
var app = express();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/mainpage.html');
});

app.use(express.static(__dirname));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});