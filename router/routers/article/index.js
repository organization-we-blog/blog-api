const express = require("express");
let multer  = require('multer')
let upload = multer({ dest: 'public/uploads/' });

const router = express.Router();

// 图片文件上传
router.post('/upload', upload.single('avatar'), function (req, res) {
    require("./upload.js")(req, res);
});

router.post("/article/addClassify",function (req, res) {
    require("./addClassify.js")(req, res);
});

router.post("/article/addTag",function (req, res) {
    require("./addTag.js")(req, res);
});

router.post("/article/addArticle",function (req, res) {
    require("./addArticle.js")(req, res);
});

router.post("/article/newArticleGetTagAndClassify",function (req, res) {
    require("./newArticleGetTagAndClassify.js")(req, res);
});

router.post("/article/getArticle",function (req, res) {
    require("./getArticle.js")(req, res);
});

module.exports = router;
