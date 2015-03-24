/**
 * Created by tuncaulubilge on 21/03/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    salt: String,
    hash: String,
    provider: String, // site, facebook, twitter
    facebook: {
        id: String,
        token: String,
        json: String // Raw facebook connect js
    },
    profile: {
        firstName: String,
        lastName: String,
        gender: String
    }
});

module.exports = mongoose.model('user',UserSchema);