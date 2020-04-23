const SettingModel = require("../../../mongo/models/setting");

module.exports = async (req, res) => {
  // 查询网站配置信息
  const settings = await SettingModel.find();
  // 响应
  return res.send({ code: 0, msg: '获取成功', datas: settings });
}