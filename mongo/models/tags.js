const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tag = new Schema({
    value: String,//标签名
    sum: {type: Number, default: 0},//该标签下的文章数量
});
let tags = mongoose.model('tags', tag);



module.exports = tags;

