/**
 * Created by tuncaulubilge on 21/03/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    salt: String,
    hash: String
});

module.exports = mongoose.model('user',UserSchema);