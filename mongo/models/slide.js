const mongoose = require('mongoose');

// 创建轮播图规则
const SlideSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 2, maxlength: 30 }, // 轮播图文字
  image: { type: String, required: true, default: null }, // 轮播图图片地址
  link: { type: String, default: null } // 轮播图超链接
})

// 轮播图模型
const SlideModel = mongoose.model('Slide', SlideSchema);

// 导出模型
module.exports = SlideModel