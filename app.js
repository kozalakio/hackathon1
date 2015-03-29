/**
 *  Module dependencies
 */
var bodyParser = require('body-parser');
var configs = require('./configs/configs');
var cookieParser = require('cookie-parser');
var express = require('express');
var errorHandler = require('errorhandler');
var logger = require('morgan');
var lusca = require('lusca');
var mongoose = require('mongoose');
var path = require('path');
var router = require('./components/router');
var session = require('express-session');

/**
 * Create express server
 */
var app = express();

/**
 * Connect to mongodb
 */
mongoose.connect(configs.db);
mongoose.connection.on('error', function () {
    throw 'db connection failed';
});

/**
 * Express config
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public'), {maxAge: 31557600000}));
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: configs.sessionSecret
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(lusca({
//    csrf: true,
//    xframe: 'SAMEORIGIN',
//    xssProtection: true
//}));

// passport
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());


// false & dont use on production
app.locals.pretty = true;
app.use(errorHandler());

// routing
app.use(router);

app.listen(app.get('port'), function () {
    console.log('listening on port %s', app.get('port'));
});
