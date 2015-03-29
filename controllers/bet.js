/**
 * Created by tuncaulubilge on 29/03/15.
 */
var Bet = require('../models/bet.js');

// GET /
exports.index = function (req, res) {
    //return Bet.find(function (err, bets) {
    //    if (!err) {
    //        res.render('bet_list', {
    //            bets: bets
    //        });
    //
    //
    //    } else {
    //        return console.log(err);
    //    }
    //});
};

// GET /add
exports.addPage = function (req, res) {

};

// POST /add
exports.add = function (req, res) {
    //console.log(req.body);
    //var driver;
    //
    //driver = new Bet({
    //    firstName:req.body.firstname,
    //    lastName:req.body.lastname
    //});
    //
    //driver.save(function (err) {
    //    if (!err) {
    //        return console.log("created");
    //    } else {
    //        //TODO: return page with errors
    //        return console.log(err);
    //    }
    //});
    ////TODO: return to list page, if saved
    //res.redirect('/bets/');
    //return res.send(driver);
};

// GET /:id
exports.single = function (req, res) {
    //return Bet.findById(req.params.id, function (err, bet) {
    //    if (!err) {
    //        res.send(bet);
    //    } else {
    //        return console.log(err);
    //    }
    //});
};
