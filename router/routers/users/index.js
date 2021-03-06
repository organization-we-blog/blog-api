const express = require("express");
const router = express.Router();
const {filterRole} = require("../../../util/token")

// 注册(all)
router.post('/register', require('./register'));

//验证注册信息是否可行（all）
router.get('/users/verify', require('./verify'));

// 登录(all)
router.post('/login', require('./login'));

// 修改当前登录用户信息 (this)
router.post('/updateUser', require('./updateUser'));

// 获取用户列表 (接口待完善)
router.get('/userList', require('./userList'));

// 获取所有用户(admin)
router.get('/user/getAll', filterRole("admin",require("./getAll")));

// 根据 id 查询用户（all）
router.get('/users/:id', require('./findUserById'));

// 根据 id 修改用户 (admin)
router.put('/users/:id', filterRole("admin",require("./updateUserById")));

// 根据 id 删除用户(接口待完善)
router.delete('/users/:id', require('./deleteUserById'));

// 登录用户密码修改(this)
router.put('/password', require('./password'));

module.exports = router;
