const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tag = new Schema({
    // 标签名称
    //title: { type: String, minlength: 2, maxlength: 40, required: true },
    // 标签名
    tagName: { type: String, minlength: 2, maxlength: 20, required: true},
    // 标签专属颜色
    tagColor: { type: String, minlength: 4, maxlength: 7, default: "#44afff"},
    // 创建时间
    createTime: {type: Date, default: Date.now},
    //状态（1：正常，2: 已删除,3:待审核）
    state: {type: Number, default: 3},
});
let tags = mongoose.model('tags', tag);

module.exports = tags;

