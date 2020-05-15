const SettingModel = require("../../../mongo/models/setting");
let fs = require("fs");

// 添加网站设置
module.exports = async (req, res) => {
  // 获取标题, 网站描述, 关键词
  let { title, description, keywords } = req.body
  // 数据格式校验
  if (title.trim() === "") {
    return res.send({ code: 1, msg: '网站标题不能为空', datas: [] })
  }
  // 格式符合要求 继续向下执行

  // 获取文件
  let file = req.file;
  fileInfo = {}
  if (!file) {
    return res.send({ code: 2, msg: '上传文件失败', datas: [] })
  }
  //修改文件名字, 防止上传重复的文件
  fs.renameSync('./public/logo/' + file.filename, './public/logo/' + file.originalname);
  // 设置响应类型及编码
  res.set({
    'content-type': 'application/json; charset=utf-8'
  });
  // 准备文件地址
  filePath = '/public/logo/' + file.originalname
  fileInfo.logo = filePath
  fileInfo.title = title
  fileInfo.description = description
  fileInfo.keywords = keywords
  // 清除现有设置
  await SettingModel.deleteMany({});
  // 创建网站设置
  let setting = new SettingModel(fileInfo);
  await setting.save();
  res.send({ code: 0, msg: '网站设置成功', datas: setting })
}
