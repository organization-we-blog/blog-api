const express = require("express");
const JWT = require("jsonwebtoken");
const router = express.Router();
const {isAdmin} = require("../../token")

router.post('/test', async function (req,res) {
    const verifyObj = await require("../../token").verify(req.headers.token);//token验证结果(有效会返回新的token)
    if(verifyObj){//token有效
        //token为最新的token(更新了创建时间、避免失效)
        //params为token携带的数据
        //userInfo为用户信息
        let {token,params,userInfo} = verifyObj;
        await res.json({token,params,userInfo})
    }else {
        await res.json("无效")
    }
});

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
router.get('/user/getAll', function (req,res) {
    isAdmin(req,res,require("./getAll"))
});

// 根据 id 查询用户（all）
router.get('/users/:id', require('./findUserById'));

// 根据 id 修改用户 (接口待完善)
router.put('/users/:id', require('./updateUserById'));

// 根据 id 删除用户(接口待完善)
router.delete('/users/:id', require('./deleteUserById'));

// 登录用户密码修改(this)
router.put('/password', require('./password'));

module.exports = router;
