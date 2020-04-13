const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const article = new Schema({
    title: {//标题
        type: String
    },
    thumbnail: {//缩略图
        type: String,
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
    classify_id: {//分类id（分类只能有一个）
        type: ObjectId,
        ref: "classifys"//与classifys表关联
    }
    tag_id: [//标签
        {
            type: ObjectId,
            ref: "tags"//与tag表关联
        }
    ],
    user_id:{//用户
        type: ObjectId,
        ref: "users"//与tag表关联
    },
    show: {//是否公开（0：不公开，1：公开）
        type: Number,
        default: 1
    },
    pv: {//浏览量
        type: Number,
        default: 0,
        min: 0
    },
    good: {//点赞
        type: Number,
        default: 0,
        min: 0
    },
    bad: {//踩
        type: Number,
        default: 0,
        min: 0
    }
});

let articles = mongoose.model('Article', article);

module.exports = articles;

