const express = require("express");
let multer  = require('multer');
let upload = multer({ dest: 'public/uploads' });
const router = express.Router();
const {isAdmin} = require("../../token");

// 图片文件上传（all）
router.post('/upload', upload.single('avatar'), function (req, res) {
    require("./upload.js")(req, res);
});

// 添加文章（admin）
router.post("/article/addArticle",function (req, res) {
    isAdmin(req, res, require("./addArticle.js"));
});
//添加文章分类（admin）
router.post("/article/addArticlecates",function (req, res) {
    isAdmin(req, res, require("./addArticlecates.js"));
});
//添加文章标签（admin）
router.post("/article/addArticleTag",function (req, res) {
    isAdmin(req, res, require("./addArticleTag.js"));
});
//删除文章（admin）
router.post("/article/deleteArticleById",function (req, res) {
    isAdmin(req, res, require("./deleteArticleById.js"));
});
//获取所有文章基础信息，不包含content（all）
router.post("/article/getAllArticle",function (req, res) {
    require("./getAllArticle.js")(req, res);
});
//文章内容中的图片上传（admin）
router.post('/article/uploadArticleContentImg', function (req, res) {
    req.userUploadDir = "./uploads/ArticleContents/";
    isAdmin(req, res, require("./uploadImg.js"));
});
//文章缩略图的图片上传（admin）
router.post('/article/uploadArticleThumbnailImg', function (req, res) {
    req.userUploadDir = "./uploads/ArticleThumbnails/";
    isAdmin(req, res, require("./uploadImg.js"));
});
//获取所有标签和分类信息（all）
router.post('/article/getAllTagAndCategory', function (req, res) {
    require("./getAllTagAndCategory.js")(req, res);
});

/*router.post("/article/!*",function (req, res) {//添加文章（规划中）
    res.json({msg:"维护"})
});*/


router.post("/article/test",function (req, res) {//测试
    require("./test.js")(req, res);
});

module.exports = router;
