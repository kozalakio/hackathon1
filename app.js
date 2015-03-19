/**
 *  Module dependencies
 */
var express = require('express');

/**
 * Controllers
 */
var homeController = require('./controllers/home');

/**
 * Create express server
 */
var app = express();

app.get('/', homeController.index);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
