const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tag = new Schema({
    // 标签名称
    title: { type: String, minlength: 2, maxlength: 40, required: true },
    // 标签名
    className: { type: String, default: null },
    // 创建时间
    createTime: {type: Date, default: Date.now}
});
let tags = mongoose.model('tags', tag);



module.exports = tags;

