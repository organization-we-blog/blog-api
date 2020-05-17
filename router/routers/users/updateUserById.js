const UserModel = require("../../../mongo/models/users");
const ErrLogModel = require("../../../mongo/models/err_logs");
const {isObjectId} = require("../../../util/TypeVerift")
const _ = require('lodash');

module.exports = async (req, res, tokenObj) => {
  try {
    // 获取用户id
    const id = req.params['id'];
    if (!isObjectId(id)) {
      return res.send({ code: 901, msg: '用户不合法', datas: [] })
    }
    const {username,state,role,avatar,email,gender,info} = req.body
    let setObj = {}
    if(username){
      //需要修改用户名
      //验证合法性
      if(!username.trim() || username.length<2 || username.length<20 ){
        return res.json({code: 902, msg: "用户名长度只能再2-20之间", datas: []})
      }
      let oldUserInfo = await UserModel.findOne({ username })
      // 如果user存在, 返回错误的信息
      if (oldUserInfo) {
        return res.send({ code: 801, msg: '用户名已使用', datas: [] })
      }
      setObj.username = username.trim()
    }
    if(state){
      //需要修改用户状态
      if(![0,1].includes(state) ){
        return res.json({code: 903, msg: "用户状态只能是0或1", datas: []})
      }
      setObj.state = state
    }
    if(role){
      if(!["admin", "normal"].includes(role) ){
        return res.json({code: 904, msg: "用户状态只能是admin或normal", datas: []})
      }
      setObj.role = role
    }
    if(gender){
      if(!["男", "女", "保密"].includes(gender) ){
        return res.json({code: 902, msg: "性别不合法", datas: []})
      }
      setObj.gender = gender
    }
    if(avatar){
      if(avatar === "" ){
        return res.json({code: 902, msg: "头像不能为空", datas: []})
      }
      setObj.avatar = avatar
    }
    if(email){
      if(!/^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(email)){
        return res.json({code: 902, msg: "邮件不合法", datas: []})
      }
      setObj.email = email
    }
    if(info){
      if(info.trim().length > 200){
        return res.json({code: 902, msg: "简介长度超过200", datas: []})
      }
      setObj.info = info.trim()
    }

    //修改数据库
    let user = await UserModel.findByIdAndUpdate(
        { _id: id },
        setObj,
        { new: true, fields: '-password' })
    if(!user){
      return res.json({code: 802, msg: "用户id不存在", datas: []})
    }
    //生成新token
    let token = require("../../../util/token").init(user.username, tokenObj.params.password);
    res.json({code: 200, msg: "修改成功", datas: [user], token})
  }catch (e) {
    res.json({code: 500, msg: "服务器繁忙", datas: []})
    ErrLogModel.addErrLog(req,e,__filename)
  }
}
