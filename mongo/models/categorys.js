const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const category = new Schema({//文章分类
    // 父分类id（null表示没有父分类）
    //parent: { type: ObjectId, default: null},
    //标题
    //title: { type: String, minlength: 2, maxlength: 20, required: true },
    // 分类类名
    className: { type: String, minlength: 2, maxlength: 20, required: true },
    // 创建时间
    createTime: {type: Date, default: Date.now}
});
let categorys = mongoose.model('categorys', category);
module.exports = categorys;

