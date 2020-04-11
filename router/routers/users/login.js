const UserModel = require("../../../mongo/models/users");
const err_logs = require("../../../mongo/models/err_logs");
const md5 = require('blueimp-md5')
const filter = { password: 0, __v: 0 } // 查询时过滤出指定的属性

module.exports = function (req, res) {
  const { username, password } = req.body
  // 根据username和password查询数据库users集合, 如果没有, 返回提示错误的信息, 如果有, 返回登录成功的信息(user)
  UserModel.findOne({ username, password: md5(password) }, filter, function (err, user) {
    if (user) {
      // 登录成功
      // 生成一个cookie(userid: user._id), 并交给浏览器保存
      res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 })
      // 返回成功的信息
      res.send({ code: 0, data: user })
    } else {
      // 登录失败
      res.send({ code: 1, msg: '用户名或密码错误' })
    }
  })
}