const UserModel = require("../../../mongo/models/users");
const err_logs = require("../../../mongo/models/err_logs");
const md5 = require('blueimp-md5')

module.exports = function (req, res) {
  // 1.获取请求参数
  const { username, password } = req.body
  // 2.处理: 判断用户是否已经存在, 如果存在, 返回提示错误的信息, 如果不存在, 保存
  // 查询(根据username)
  UserModel.findOne({ username }, function (err, user) {
    if (err) {
      err_logs.addErrLog(req, "数据库错误", "数据库存储错误", __filename);//存日志
      res.statusCode = 500;//给500码
      res.json({ msg: "error", result: [] })//响应
    }
    // 如果user存在, 返回错误的信息
    if (user) {
      res.send({ code: 1, msg: '用户已存在' })
    } else {
      // 如果不存在, 初始化用户模型(保存)  密码进行加密处理
      UserModel.create({ username, password: md5(password) }, function (err, user) {
        if (err) {
          err_logs.addErrLog(req, "数据库错误", "数据库存储错误", __filename);//存日志
          res.statusCode = 500;//给500码
          res.json({ msg: "error", result: [] })//响应
        }
        // 生成一个cookie(userid: user._id), 并交给浏览器保存
        res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 })
        // 返回包含user的json数据 密码不要进行返回
        const data = { username, _id: user._id }
        res.send({ code: 0, data })
      })
    }
  })
};

