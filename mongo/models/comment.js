const mongoose = require('mongoose');

// 创建评论模型
const CommentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },  // 评论人
  content: { type: String, minlength: 1, required: true }, //评论内容
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'articles', required: [true, '评论文章id不存在'] }, // 评论文章
  // 0 未批准 1 批准
  state: { type: Number, default: 0 }, // 评论状态
  createTime: { type: Date, default: Date.now } // 评论时间
})

// 创建分类集合
const CommentModel = mongoose.model('Comment', CommentSchema);

// 导出评论模块
module.exports =  CommentModel