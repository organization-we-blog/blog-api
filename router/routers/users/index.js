const express = require("express");

const router = express.Router();

// 注册
router.post('/register', (req, res) => {
  require('./register.js')(req, res)
})

// 登录
router.post('/login', (req, res) => {
  require('./login.js')(req, res)
})


module.exports = router;