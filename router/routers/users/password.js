const UserModel = require("../../../mongo/models/users");
const md5 = require('blueimp-md5')
const filter = { password: 0, __v: 0 } // 查询时过滤出指定的属性

module.exports = async (req, res) => {
  const { old_password, new_password } = req.body
  // 判断当前用户是否处于登录状态
  const { userid } = req.cookies
  if (!userid) {
    return res.send({ code: 1, msg: '用户未登录', datas: [] })
  }
  // 用户已登陆, 查询用户原密码, 比对旧密码
  let { password: originpassword } = await UserModel.findById({ _id: userid })
  // 由于md5加密相同的字符的结果都是相同的码，会出现撞库的风险(暂时使用这样的加密算法)
  if (md5(old_password) !== originpassword) {
    return res.send({ code: 3, msg: '原密码不一致', datas: [] })
  }
  // 原密码比对成功, 执行更改密码的操作
  try {
    await UserModel.findByIdAndUpdate({ _id: userid }, { password: md5(new_password) }, filter)
    res.send({ code: 0, msg: '密码更新成功' })
  } catch {
    res.send({ code: 4, msg: '密码更新失败' })
  }
}