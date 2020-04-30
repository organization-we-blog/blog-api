const UserModel = require("../../../mongo/models/users");
const err_logs = require("../../../mongo/models/err_logs");
const md5 = require('blueimp-md5');

module.exports = async (req, res) => {
  // 1.获取请求参数
  const { username, password, password2 } = req.body;
  if (!username || !password) {
    return res.send({ code: 2, msg: '用户名或密码不能为空', datas: [] })
  }
  // 2.判断两次密码是否相同
  if (password !== password2) {
    return res.send({ code: 3, msg: '密码不一致', datas: [] })
  }
  // 3.处理: 判断用户是否已经存在, 如果存在, 返回提示错误的信息, 如果不存在, 保存
  // 查询(根据username)
  let oldUserInfo = await UserModel.findOne({ username });
  // 如果user存在, 返回错误的信息
  if (oldUserInfo) {
    return res.send({ code: 4, msg: '用户名已存在', datas: [] })
  }
  // 4.如果不存在, 初始化用户模型(保存)  密码进行加密处理
  try {
    let user = await UserModel.create({ username, password: md5(password) });
    // 5.生成一个token(包含用户名和密码), 并返回给前端
    let params = { username, password: md5(password) };
    // 生成Token
    let token = require("../../token").init(params);

    //返回包含user和token的json数据 密码不要进行返回
    const datas = [
        { username,
          role: user.role,
          avatar: user.avatar,
          state: user.state,
          gender: user.gender,
          info: user.info,
          email: user.email,
          _id: user._id,
          createTime: user.createTime,
        }];
    res.send({ code: 1, msg: '用户注册成功', datas, token })
  } catch(e){
    err_logs.addErrLog(req,e,__filename);
    return res.send({ code: 0, msg: '服务器繁忙', datas: [] })
  }
};
