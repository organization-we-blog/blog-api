const mongoose = require('mongoose');

// 创建评论模型
const CommentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },  // 评论人
  content: { type: String, minlength: 1, required: true }, //评论内容
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'articles', required: [true, '评论文章id不存在'] }, // 评论文章
  //状态（1：正常，2: 已删除,3:待审核）
  state: { type: Number, default: 1 },
  createTime: { type: Date, default: Date.now } // 评论时间
})

// 创建分类集合
const CommentModel = mongoose.model('Comment', CommentSchema);

// 导出评论模块
module.exports =  CommentModel
