const express = require("express");
let multer  = require('multer');
let upload = multer({ dest: 'public/uploads' })
const router = express.Router();

// 图片文件上传
router.post('/upload', upload.single('avatar'), function (req, res) {
    require("./upload.js")(req, res);
});

/*
router.post('/article/fileSubmit', function (req, res) {//文章内容文件上传
    require("./fileSubmit.js")(req, res);
});

router.post("/article/addClassify",function (req, res) {//添加文章分类
    require("./addClassify.js")(req, res);
});

router.post("/article/addTag",function (req, res) {//添加文章标签
    require("./addTag.js")(req, res);
});

router.post("/article/addArticle",function (req, res) {//添加文章（规划中）
    require("./addArticle.js")(req, res);
});

router.post("/article/getTagAndClassify",function (req, res) {//获取所有分类和文章数据
    require("./getTagAndClassify.js")(req, res);
});

router.post("/article/getAllArticle",function (req, res) {//获取所有文章（规划中）
    require("./getAllArticle.js")(req, res);
});

router.post("/article/deleteArticleById",function (req, res) {//添加文章（规划中）
    require("./deleteArticleById.js")(req, res);
});
*/
router.post("/article/*",function (req, res) {//添加文章（规划中）
    res.json({msg:"维护"})
});


module.exports = router;
