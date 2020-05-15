const UserModel = require("../../../mongo/models/users");
const {isObjectId} = require("../../../public/type_verify")
const ErrLogModel = require("../../../mongo/models/err_logs")

module.exports = async (req, res) => {
  try {
  // 获取用户id
  const id = req.params['id'];
  // 判断id是否存在
  if (!id) {
    return res.send({ code: 901, msg: '用户id不能为空', datas: [] })
  }
  if(!isObjectId(id)){
    return res.send({ code: 902, msg: '这不是一个合法的id', datas: [] })
  }
  // 通过验证
  // 查询用户信息
  const user = await UserModel.findById(id).select('-password');
    console.log(user);
    if(user){
      // 响应
      return res.send({ code: 200, msg: '查询用户成功', datas: user });
    }else {
      return res.send({ code: 801, msg: '用户id不存在', datas: [] });
    }
  } catch(e){
    ErrLogModel.addErrLog(req,e,__filename)
    res.send({ code: 500, msg: '服务器繁忙', datas: [] })
  }
};
