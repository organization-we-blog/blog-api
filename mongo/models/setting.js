const mongoose = require('mongoose');
const { Schema } = mongoose;

// 创建网站设置模型规则
const SettingSchema = new Schema({
  logo: { type: String, default: null }, // 网站logo
  title: { type: String, minlength: 2, maxlength: 30 }, // 网站名称
  description: { type: String, minlength: 2, maxlength: 30 }, // 网站描述
  keywords: { type: String, minlength: 2, maxlength: 30 }, // 网站关键词
  comment: { type: Boolean, default: false }, // 是否开启评论功能
  review: { type: Boolean, required: true, default: true } // 人工审核评论
})

// 网站设置模型
const SettingModel = mongoose.model('Setting', SettingSchema);

// 导出模型
module.exports = SettingModel