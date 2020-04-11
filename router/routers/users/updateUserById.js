const UserModel = require("../../../mongo/models/users");
const _ = require('lodash');

module.exports = async (req, res) => {
  // 获取用户id
  const id = req.params['id'];
  if (!id) {
    return res.send({ code: 1, msg: '用户id不能为空', datas: [] })
  }
  // 得到提交的用户数据
  const user = req.body // 没有userid
  // 查询(根据username)
  let oldUserInfo = await UserModel.findOne({ username: user.username })
  // 如果user存在, 返回错误的信息
  if (oldUserInfo) {
    return res.send({ code: 2, msg: '用户名已使用', datas: [] })
  }
  let users = await UserModel.findByIdAndUpdate({ _id: id }, user, { new: true, fields: '-password' })
  // 响应
  res.send({ code: 0, msg: '更新成功', datas: users });
}