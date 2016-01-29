var express = require('express');
jsdom = require("jsdom");
$ = require('jquery')(jsdom.jsdom().defaultView);
var app = express();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/mainpage.html');
});

app.use(express.static(__dirname));

var server = app.listen(process.env.PORT || 8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});