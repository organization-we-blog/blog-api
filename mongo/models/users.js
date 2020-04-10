const mongoose = require('mongoose');

//创建集合规则
const userSchema = new mongoose.Schema({
    username:{type:String,required:true,minlength:2,maxlength:20},//用户名
    password:{type:String,required:true}, //密码
    header: { type: String }, // 头像
    info: { type: String }, // 个人信息/签名
    //角色
    //注意：role的值如果为admin表示是超级管理员，如果是normal表示是普通用户
    role:{type:String,default:'normal'},
    //用户状态
    //注意：state的值如果为0表示用户是启用的，如果为1表示用户被禁用了
    state:{type:Number,default:0}
})

//使用集合规则创建集合
const UserModel = mongoose.model('User',userSchema);

//导出集合对象
module.exports = UserModel