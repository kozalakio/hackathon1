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

/**
 * Express config
 */
app.set('port', process.env.PORT || 3000);

app.get('/', homeController.index);

app.listen(app.get('port'), function () {
  console.log('listening on port %s', app.get('port'));
});
