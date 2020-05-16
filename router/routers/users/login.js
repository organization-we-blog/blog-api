const UserModel = require("../../../mongo/models/users");
const md5 = require('blueimp-md5');
const filter = { password: 0, __v: 0 }; // 查询时过滤出指定的属性

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;
    if(!username){
      return res.json({code: 901,msg: "用户名不能为空", datas:[]})
    }else if(!password){
      return res.json({code: 902,msg: "密码不能为空", datas:[]})
    }

    // 根据username和password查询数据库users集合, 如果没有, 返回提示错误的信息, 如果有, 返回登录成功的信息(user)
    let user = await UserModel.findOne({ username, password: md5(password) }, filter);
    if (user) {
      // 登录成功
      // 生成一个token并一起返回
      let token = require("../../../util/token").init(username,md5(password));
      // 返回成功的信息
      res.send({ code: 200,msg:'登录成功', datas: [user], token })
    } else {
      // 登录失败
      res.send({ code: 801, msg: '用户名或密码错误',datas:[] })
    }
  }catch (e) {
    require("../../../mongo/models/err_logs")
        .addErrLog(req,e,__filename);
    res.send({ code: 500, msg: '服务器繁忙',datas:[] })
  }
};
