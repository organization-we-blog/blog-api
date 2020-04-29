const express = require("express");
let multer  = require('multer');
let upload = multer({ dest: 'public/uploads' });
const router = express.Router();

// 图片文件上传
router.post('/upload', upload.single('avatar'), function (req, res) {
    require("./upload.js")(req, res);
});

// 添加文章
router.post("/article/addArticle",function (req, res) {//添加文章
    require("./addArticle.js")(req, res);
});
router.post("/article/addArticlecates",function (req, res) {//添加文章分类
    require("./addArticlecates.js")(req, res);
});

router.post("/article/addArticleTag",function (req, res) {//添加文章标签
    require("./addArticleTag.js")(req, res);
});

router.post("/article/deleteArticleById",function (req, res) {//删除文章
    require("./deleteArticleById.js")(req, res);
});

router.post("/article/getAllArticle",function (req, res) {//获取所有文章（规划中）
    require("./getAllArticle.js")(req, res);
});

router.post('/article/uploadArticleContentImg', function (req, res) {//文章内容中的图片上传
    req.userUploadDir = "./uploads/ArticleContents/";
    require("./uploadImg.js")(req, res);
});

router.post('/article/uploadArticleThumbnailImg', function (req, res) {//文章缩略图的图片上传
    req.userUploadDir = "./uploads/ArticleThumbnails/";
    require("./uploadImg.js")(req, res);
});

/*router.post("/article/!*",function (req, res) {//添加文章（规划中）
    res.json({msg:"维护"})
});*/


router.post("/article/test",function (req, res) {//测试
    require("./test.js")(req, res);
});

module.exports = router;
