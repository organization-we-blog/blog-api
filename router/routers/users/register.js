const UserModel = require("../../../mongo/models/users");
const md5 = require('blueimp-md5')

module.exports = async (req, res) => {
  // 1.获取请求参数
  const { username, password, password2 } = req.body
  if (username.trim() === "" || password.trim() === "") {
    return res.send({ code: 1, msg: '用户名或密码错误', datas: [] })
  }
  // 2.判断两次密码是否相同
  if (password !== password2) {
    return res.send({ code: 2, msg: '密码不一致', datas: [] })
  }
  // 3.处理: 判断用户是否已经存在, 如果存在, 返回提示错误的信息, 如果不存在, 保存
  // 查询(根据username)
  let oldUserInfo = await UserModel.findOne({ username })
  // 如果user存在, 返回错误的信息
  if (oldUserInfo) {
    return res.send({ code: 3, msg: '用户已存在', datas: [] })
  }
  // 4.如果不存在, 初始化用户模型(保存)  密码进行加密处理
  try {
    user = await UserModel.create({ username, password: md5(password) })
  } catch{
    return res.send({ code: 4, msg: '用户注册失败', datas: [] })
  }
  // 5.生成一个cookie(userid: user._id), 并交给浏览器保存
  res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 })
  // 6.返回包含user的json数据 密码不要进行返回
  const datas = [{ username, role: user.role, avatar: user.avatar, state: user.state, gender: user.gender, info: user.info, email: user.email, _id: user._id, createTime: user.createTime }]
  res.send({ code: 0, msg: '用户注册成功', datas })
};
