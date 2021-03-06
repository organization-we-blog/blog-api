const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const article = new Schema({
    title: {  //标题
        type: String,
        minlength: 2,
        maxlength: 50,
        required: [true, '请输入文章标题']
    },
    thumbnail: {//缩略图
        type: String,
        default: null
    },
    synopsis: {//简介
        type: String,
        minlength: 2,
        maxlength: 200,
    },
    create_time: {//创建时间
        type: Date,
        default: Date.now
    },
    update_time: {//修改时间
        type: Date,
        default: Date.now
    },
    content: { // 内容
        type: String,
        default: null
    },
    category: {//分类
        type: ObjectId,
        ref: "categorys", //与categorys表关联
        required: [true, '分类信息不存在']
    },
    tag: [ //标签
        {
            type: ObjectId,
            ref: "tags"//与tags表关联
        }
    ],
    author: {//用户
        type: ObjectId,
        ref: "User", //与users表关联
        required: true
    },
    state: {//状态（0：私有，1：正常，2: 已删除,3:待审核）
        type: Number,
        default: 1
    },
    meta: {
        // 浏览量
        pv: { type: Number, default: 0, min: 0 },
        // 点赞
        good: { type: Number, default: 0, min: 0 },
        // 踩
        bad: { type: Number, default: 0, min: 0 },
        // 评论数量
        comments: { type: Number, default: 0, min: 0 }
    }
});

let articles = mongoose.model('articles', article);

module.exports = articles;
