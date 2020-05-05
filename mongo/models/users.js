const mongoose = require('mongoose');

//创建用户集合规则
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, minlength: 2, maxlength: 20 },// 用户名
    password: { type: String, required: true, minlength: 6, maxlength: 18  }, // 密码
    email: { type: String },// 邮箱
    gender: { type: String, default: '男', enum: ['男', '女', '保密'] }, // 性别
    avatar: { type: String, default: null }, // 头像
    info: { type: String, maxlength: 200}, // 个人信息/签名
    createTime: { type: Date, default: Date.now },// 创建时间
    updateTime: { type: Date, default: Date.now }, // 更新时间
    //注意：role的值如果为admin表示是超级管理员，如果是normal表示是普通用户
    role: { type: String, default: 'normal', enum: ['admin', 'normal'] },//角色
    //注意：state的值如果为0表示用户是启用的，如果为1表示用户被禁用了
    state: { type: Number, default: 0 } //用户状态
})

//使用集合规则创建集合
const UserModel = mongoose.model('User', userSchema);

//导出集合对象
module.exports = UserModel
