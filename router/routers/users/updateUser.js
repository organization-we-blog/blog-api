const UserModel = require("../../../mongo/models/users");
const err_logs = require("../../../mongo/models/err_logs");
const {isObjectId} = require("../../../public/type_verify")


module.exports = async (req, res) => {
  try {
    //1、验证是否登陆
    if(req.headers.token){
      //包含token（含有登陆信息）
      //2、验证token是否有效
      let tokenObj = await require("../../token").verify(req.headers.token);
      let setObj = {}
      if(tokenObj){//token有效
        let {username,email,gender,avatar,info} = req.body;
        //3、验证修改后的信息是否可用（一系列验证，请将与数据库有关的验证放到最后）
        if(email){
          setObj.email = email;
          if(!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(email)){
            return res.send({ code: 5, msg: '请传入一个合法的邮件地址', datas: [] });
          }
        }
        if(gender){
          setObj.gender = gender;
          if(!["男","女","保密"].includes(gender)){
            return res.send({ code: 6, msg: '性别只能是男、女、保密其中的一个', datas: [] });
          }
        }
        if(avatar){
          setObj.avatar = avatar;
          if(avatar !== ""){
            return res.send({ code: 7, msg: '头像地址不能为空', datas: [] });
          }
        }
        if(info){
          setObj.info = info;
          if(info.length > 200){
            return res.send({ code: 8, msg: '个性签名长度不能超过200', datas: [] });
          }
        }
        if(username){
          setObj.username = username;
          if(username.length<2 || username.length>20){
            return res.send({ code: 4, msg: '用户名长度只能在2-20之间', datas: [] });
          }
          if(await UserModel.findOne({username})){
            //用户名已经存在
            return res.send({ code: 3, msg: '用户名已存在', datas: [] });
          }
        }


        //4、修改用户信息
        let user = await UserModel.findByIdAndUpdate(tokenObj.userInfo._id,{$set:setObj},{ new: true, fields: '-password' });
        //生成一个新的token
        let token = require("../../token").init({username:user.username,password:tokenObj.userInfo.password});
        return res.send({ code: 0, msg: '修改成功', datas: [user],token });
      }else {//token无效
        return res.send({ code: 2, msg: '登录信息无效', datas: [] });
      }
    }else {
      //不包含token（未登陆）
      return res.send({ code: 1, msg: '请先登录', datas: [] });
    }
  }catch (e) {
    console.log(e);
    err_logs.addErrLog(req,e,__filename);//存错误日志
    await res.json({code:500,msg: "修改失败",datas: []});
  }
};
