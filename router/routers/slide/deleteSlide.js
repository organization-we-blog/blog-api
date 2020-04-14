const SlideModel = require("../../../mongo/models/slide");
const Joi = require('joi');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
// 删除文件
const unlink = promisify(fs.unlink);

module.exports = async (req, res) => {
  // 获取轮播id
  const id = req.params['id'];
  console.log(id);
  // 验证模型
  const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('轮播图id不符合格式'))
  // 验证
  const { error } = Joi.validate(id, schema);
  // 数据格式没有通过验证
  if (error) return res.status(400).send({ message: error.message });
  // 删除轮播图
  let slide = await SlideModel.findByIdAndDelete(id);
  console.log(slide);
  
  // 如果轮播图存在
  if (slide.image) {
    // 删除轮播图
    await unlink(path.join(__dirname, '../', '../', '..', slide.image));
  }
  // 响应
  res.send({ code: '0', msg: '轮播图删除成功', datas: [] });
}