const express = require("express");
const article = require("./routers/article/index.js");//article（后台文章页面）的相关接口
const users = require('./routers/users/index') // 用户接口
const slide = require('./routers/slide/index') // 轮播图接口
const setting = require('./routers/settings/index') // 网站设置
const comment = require('./routers/comments/index') // 评论相关

const router = express.Router();

exports.router = router;
exports.article = article;
exports.users = users
exports.slide = slide
exports.setting = setting
exports.comment = comment

