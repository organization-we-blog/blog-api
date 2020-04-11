const express = require("express");

const router = express.Router();

// 注册
router.post('/register', require('./register'))

// 登录
router.post('/login', require('./login'))

// 更新当前登录用户信息 (接口待完善)
router.post('/updateUser', require('./updateUser'))

// 获取用户列表
router.get('/userList', require('./userList'))

// 根据 id 查询用户
router.get('/users/:id', require('./findUserById'))

// 根据 id 修改用户 (接口待完善)
router.put('/users/:id', require('./updateUserById'))

// 根据 id 删除用户 
router.delete('/users/:id', require('./deleteUserById'))

module.exports = router;