const UserModel = require("../../../mongo/models/users");
const md5 = require('blueimp-md5')

module.exports = async (req, res) => {
  try {
    const {old_password, new_password} = req.body;
    if (!old_password || !new_password) {
      return res.send({code: 901, msg: '新密码或者旧密码为空', datas: []});
    }
    if (old_password === new_password) {
      return res.send({code: 901, msg: '新密码与旧密码一样', datas: []});
    }
    if (new_password.length < 6 || new_password.length > 20 || !(/^[0-9a-zA-Z]{6,20}$/.test(new_password))) {
      return res.send({code: 902, msg: '新密码只能由6-20位数字或字母组合而成', datas: []});
    }
    //验证行密码规则
    if (!req.headers.token) {
      return res.send({code: 403, msg: '您还未登陆', datas: []});
    }
    //解析token
    let tokenObj = await require("../../../util/token").verify(req.headers.token);
    if (tokenObj) {
      //获取token解析结果中当前用户id并修改密码
      const userId = await tokenObj.userInfo._id;
      //验证并修改
      let result = await UserModel.findOneAndUpdate(
          {_id: userId, password: md5(old_password)},
          {$set: {password: md5(new_password)}})
      if (result) {
        //初始化一个token
        let token = require("../../../util/token").init(result.username, result.password)
        result = result.toObject()
        delete result.password;
        return res.send({code: 200, msg: '修改成功', datas: [result], token});
      } else {
        return res.send({code: 801, msg: '旧密码错误', datas: []});
      }
    } else {
      return res.send({code: 403, msg: '登录信息无效', datas: []});
    }

  } catch (e) {
    require("../../../mongo/models/err_logs").addErrLog(req, e, __filename);
    return res.send({code: 500, msg: '服务器繁忙', datas: []})
  }
}
