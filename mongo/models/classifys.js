const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classify = new Schema({
    value: String,//分类名
    sum: {type: Number, default: 0},//该分类下的文章数量
});
let classifys = mongoose.model('classifys', classify);



module.exports = classifys;

