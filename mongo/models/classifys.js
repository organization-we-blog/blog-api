const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classify = new Schema({
    value: String
});
let classifys = mongoose.model('classifys', classify);



module.exports = classifys;

