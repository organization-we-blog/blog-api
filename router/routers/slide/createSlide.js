const SlideModel = require("../../../mongo/models/slide");
let fs = require("fs");

module.exports = async (req, res) => {
  // 获取标题(必传)和图片链接(可选)
  let { title, link } = req.body
  // 获取文件
  let file = req.file;

  if (title.trim() === "") {
    return res.send({ code: 1, msg: '标题为空', datas: [] })
  }
  if (!link) {
    link = '#'
  }
  fileInfo = {}
  if (!file) {
    return res.send({ code: 2, msg: '上传文件失败', datas: [] })
  }
  //修改文件名字, 防止上传重复的文件
  fs.renameSync('./public/slides/' + file.filename, './public/slides/' + file.originalname);
  // 设置响应类型及编码
  res.set({
    'content-type': 'application/json; charset=utf-8'
  });
  
  // 准备文件地址
  filePath = '/public/slides/' + file.originalname
  fileInfo.image = filePath
  fileInfo.title = title
  fileInfo.link = link

  // 创建轮播图
  let slide = new SlideModel(fileInfo);
  await slide.save();

  res.send({ code: 0, msg: '添加轮播图成功', datas: slide })
}
