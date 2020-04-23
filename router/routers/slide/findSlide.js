const SlideModel = require("../../../mongo/models/slide");

module.exports = async (req, res) => {
  // 查找
  let slides = await SlideModel.find();
  // 响应
  res.send({ code: 0, msg: '查询成功', data: slides });
}