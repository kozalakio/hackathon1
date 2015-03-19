/**
 *  Module dependencies
 */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var lusca = require('lusca');
var errorHandler = require('errorhandler');

var configs = require('./configs/configs');

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
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use(logger('dev'));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: configs.sessionSecret
}));
app.use(lusca({
  csrf: true,
  xframe: 'SAMEORIGIN',
  xssProtection: true
}));

// false & dont use on production
app.locals.pretty = true;
app.use(errorHandler());

app.get('/', homeController.index);

app.listen(app.get('port'), function () {
  console.log('listening on port %s', app.get('port'));
});
