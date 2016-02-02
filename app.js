var express = require('express');
$ = require('jquery');
var app = express();

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/mainpage.html');
});

app.use(express.static(__dirname));

var server = app.listen(process.env.PORT || 8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});