const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const category = new Schema({//文章分类
    // 父分类id（null表示没有父分类）
    parent: { type: ObjectId, default: null},
    // 分类类名
    className: { type: String, minlength: 1, maxlength: 20, default: null, required: true },
    // 创建时间
    createTime: {type: Date, default: Date.now}
});
module.exports = mongoose.model('categorys', category);

