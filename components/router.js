/**
 * Created by tuncaulubilge on 29/03/15.
 */
var express = require('express');
var router = express.Router();
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var passport = require('passport');
var configs = require('../configs/configs');

/**
 * Controllers
 */
var accountController = require('../controllers/account');
var homeController = require('../controllers/home');
var profileController = require('../controllers/profile');
var betController = require('../controllers/bet');

// Facebook
passport.use(
    new FacebookStrategy({
            clientID: configs.fbAppId,
            clientSecret: configs.fbAppSecret,
            callbackURL: "http://www.kozalak.com/auth/facebook/callback"
        },
        accountController.facebookConnect
    ));

// Twitter
passport.use(
    new TwitterStrategy({
            consumerKey: configs.twitterConsumerKey,
            consumerSecret: configs.twitterConsumerSecret,
            callbackURL: "http://www.kozalak.com/auth/twitter/callback"
        },
        accountController.twitterConnect
    ));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

/**
 * Routes
 */
// home
router.get('/', homeController.index);

// account
router.get("/signup", accountController.signupPage);
router.post("/signup", accountController.userExist, accountController.signup);
router.get("/login", accountController.loginPage);
router.post('/login', accountController.login);
router.get('/logout', accountController.logout);
router.get('/profile', accountController.requiredAuthentication, profileController.index);

// passport
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
    passport.authenticate('facebook',
        {
            successRedirect: '/',
            failureRedirect: '/login'
        }));
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback',
    passport.authenticate('twitter',
        {
            successRedirect: '/',
            failureRedirect: '/login'
        }));

// bet
router.get('/bets', accountController.requiredAuthentication, betController.index);
router.get('/bets/add', accountController.requiredAuthentication,betController.addPage);
router.post('/bets/add', accountController.requiredAuthentication, betController.add);
router.get('/bets/:id', accountController.requiredAuthentication, betController.single);

module.exports = router;
