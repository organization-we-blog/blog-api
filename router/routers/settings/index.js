const express = require("express");
let multer = require('multer');
let upload = multer({ dest: 'public/logo' })
const router = express.Router();

// 添加网站设置
router.post('/settings', upload.single('logo'),require('./createSetting'))

// 获取网站设置信息
router.get('/settings', require('./findSettings'))

module.exports = router;