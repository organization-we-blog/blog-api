const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classify = new Schema({
    // 分类名称
    title: { type: String, minlength: 2, maxlength: 40, required: true },
    // 分类类名
    className: { type: String, default: null },
    // 创建时间
    createTime: {type: Date, default: Date.now}
});
let classifys = mongoose.model('classifys', classify);


module.exports = classifys;

