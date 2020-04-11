const UserModel = require("../../../mongo/models/users");
const md5 = require('blueimp-md5')

 // Todo  此处接口还需要优化
module.exports = async (req, res) => {
  const { userid } = req.cookies
  if (!userid) {
    // 如果不存在, 直接返回一个提示信息的结果
    return res.send({ code: 1, msg: '请先登录', datas: [] })
  }
  // 存在, 根据userid更新对应的user文档数据
  // 得到提交的用户数据
  const user = req.body // 没有userid
  // 查询(根据username)
  let oldUserInfo = await UserModel.findOne({ username: user.username })
  // 如果user存在, 返回错误的信息
  if (oldUserInfo) {
    return res.send({ code: 2, msg: '用户名已使用', datas: [] })
  }
  // 更新用户信息
  // new: true 返回修改后的文档 默认值为false 返回原始文档
  // fields: '-password'} 从返回值中抛除密码字段
  let newUser = await UserModel.findByIdAndUpdate({ _id: userid }, user, { new: true, fields: '-password' })
  res.send({ code: 0, msg: '修改成功', datas: [newUser] })
}