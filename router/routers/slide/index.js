const express = require("express");
let multer = require('multer');
let upload = multer({ dest: 'public/slides' })
const router = express.Router();

// 获取轮播图
router.get('/slide', require('./findSlide'))

// 添加轮播图片
router.post('/slide', upload.single('image'), require('./createSlide'))

// 根据id删除轮播图
router.delete('/slide/:id', require('./deleteSlide'))

module.exports = router;