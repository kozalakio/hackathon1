/**
 * Created by tuncaulubilge on 29/03/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BetSchema = new Schema({
    name: String,
    description: String,
    options: {},
    creator: {type: Schema.ObjectId, ref: 'user'},
    startDate: {type: Date, required: true, default: Date},
    endDate: {type: Date, required: true, default: Date}
});

module.exports = mongoose.model('bet', BetSchema);