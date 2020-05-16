const UserModel = require("../../../mongo/models/users");
const err_logs = require("../../../mongo/models/err_logs");


module.exports = async (req, res) => {
  try {
    //1、验证是否登陆
    if(req.headers.token){
      //包含token（含有登陆信息）
      //2、验证token是否有效
      let tokenObj = await require("../../../util/token").verify(req.headers.token);
      let setObj = {};//要修改的字段和值
      if(tokenObj){//token有效
        let {username,email,gender,avatar,info} = req.body;
        //3、验证修改后的信息是否可用（一系列验证，请将与数据库有关的验证放到最后）
        if(email){
          setObj.email = email;
          if(!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(email)){
            return res.send({ code: 901, msg: '请传入一个合法的邮件地址', datas: [] });
          }
        }
        if(gender){
          setObj.gender = gender;
          if(!["男","女","保密"].includes(gender)){
            return res.send({ code: 902, msg: '性别只能是男、女、保密其中的一个', datas: [] });
          }
        }
        if(avatar){
          setObj.avatar = avatar;
          if(!avatar.startsWith("/")){
            return res.send({ code: 903, msg: '头像地址不能为空', datas: [] });
          }
        }
        if(info){
          setObj.info = info;
          if(info.length > 200){
            return res.send({ code: 904, msg: '个性签名长度不能超过200', datas: [] });
          }
        }
        if(username){
          setObj.username = username;
          if(username.length<2 || username.length>20){
            return res.send({ code: 905, msg: '用户名长度只能在2-20之间', datas: [] });
          }
          if(await UserModel.findOne({username})){
            //用户名已经存在
            return res.send({ code: 801, msg: '用户名已存在', datas: [] });
          }
        }

        //4、修改用户信息
        let user = await UserModel.findByIdAndUpdate(tokenObj.userInfo._id,{$set:setObj},{ new: true, fields: '-password' });
        //生成一个新的token
        let token = require("../../../util/token").init(user.username,tokenObj.userInfo.password);
        return res.send({ code: 200, msg: '修改成功', datas: [user],token });
      }else {//token无效
        return res.send({ code: 403, msg: '登录信息无效', datas: [] });
      }
    }else {
      //不包含token（未登陆）
      return res.send({ code: 403, msg: '请先登录', datas: [] });
    }
  }catch (e) {
    err_logs.addErrLog(req,e,__filename);//存错误日志
    await res.json({code:500,msg: "修改失败",datas: []});
  }
};
