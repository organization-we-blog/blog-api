const UserModel = require("../../../mongo/models/users");
const filter = { password: 0, __v: 0 } // 查询时过滤出指定的属性

module.exports = async (req, res) => {
  const users = await UserModel.find().select('-password').sort('-createTime')
  res.send({ code: 0,msg:'获取用户列表成功', datas: users })
}