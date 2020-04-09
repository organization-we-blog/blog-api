const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tag = new Schema({
    value: String
});
let tags = mongoose.model('tags', tag);



module.exports = tags;

