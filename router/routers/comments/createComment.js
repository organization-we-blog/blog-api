const CommentModel = require("../../../mongo/models/comment");
const articles = require('../../../mongo/models/articles')

module.exports = async (req, res) => {
  const { author, content, post } = req.body
  console.log(author, content, post);
  if (!author && !post) {
    return res.send({ code: 1, msg: '用户id或文章id非法', datas: [] })
  }
  if (content.trim() === '') {
    return res.send({ code: 2, msg: '评论内容不能为空', datas: [] })
  }
  const comment = new CommentModel(req.body)
  await comment.save()
  // 找到被评论的文章
  let article = await articles.findOne({ _id: post })
  // 修改评论数量
  article.meta.comments = article.meta.comments + 1
  await article.save()
  res.send({ code: 0, msg: '添加评论成功', datas: comment })
}