const express = require("express");
let multer  = require('multer');
let upload = multer({ dest: 'public/uploads' });
const router = express.Router();
const {filterRole} = require("../../../util/token");

// 图片文件上传（all）
router.post('/upload', upload.single('avatar'), function (req, res) {
    require("./upload.js")(req, res);
});

// 添加文章（admin）
router.post("/article/addArticle", filterRole(["admin"],require("./addArticle.js")));
//添加文章分类（admin）
router.post("/article/addArticlecates",filterRole("admin", require("./addArticlecates.js")));
//添加文章标签（admin）
router.post("/article/addArticleTag",filterRole("admin", require("./addArticleTag.js")));
//删除文章（admin）
router.post("/article/deleteArticleById",filterRole("admin", require("./deleteArticleById.js")) );
//获取所有文章基础信息，不包含content（all）
router.post("/article/getAllArticle",require("./getAllArticle.js"));
//文章内容中的图片上传（admin）
router.post('/article/uploadArticleContentImg', function (req, res) {
    req.userUploadDir = "./uploads/ArticleContents/";
    filterRole("admin", require("./uploadImg.js"))(req, res);
});
//文章缩略图的图片上传（admin）
router.post('/article/uploadArticleThumbnailImg', function (req, res) {
    req.userUploadDir = "./uploads/ArticleThumbnails/";
    filterRole("admin", require("./uploadImg.js"))(req, res);
});
//获取所有标签和分类信息（all）
router.post('/article/getAllTagAndCategory', require("./getAllTagAndCategory.js"));


//测试用
router.post("/article/test",require("./test.js"));

module.exports = router;
