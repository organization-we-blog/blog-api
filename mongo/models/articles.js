const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const article = new Schema({
    title: {
        type: String,
        default: "我没填标题"
    },
    synopsis: {
        type: String,
        default: "我没填简介"
    },
    filepath: {
        type: String,
        default: "404"
    },
    create_time: {
        type: String,
        default: "2020/0/0"
    },
    update_time: {
        type: String,
        default: "2020/0/0"
    },
    classify: String,
    tag: {
        type: Array,
        default: []
    },
    pv: {
        type: Number,
        default: 0,
        min: 0
    },
    good: {
        type: Number,
        default: 0,
        min: 0
    },
    bad: {
        type: Number,
        default: 0,
        min: 0
    }
});

let articles = mongoose.model('articles', article);

module.exports = articles

