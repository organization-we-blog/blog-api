const express = require("express");
const article = require("./routers/article/index.js");//article（后台文章页面）的相关接口



const router = express.Router();

exports.router = router;
exports.article = article;

