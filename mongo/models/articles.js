const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const article = new Schema({
    title: {  //标题
        type: String
    },
    thumbnail: {//缩略图
        type: String,
        default: null
    },
    synopsis: {//简介
        type: String
    },
    content_path: {//内容文件路径
        type: String
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
        ref: "classifys"//与classifys表关联
    },
    tag: [ //标签
        {
            type: ObjectId,
            ref: "tags"//与tag表关联
        }
    ],
    author: {//用户
        type: ObjectId,
        ref: "users"//与users表关联
    },
    show: {//是否公开（0：不公开，1：公开）
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

let articles = mongoose.model('Article', article);

module.exports = articles;

