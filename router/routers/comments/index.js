const express = require("express");
const router = express.Router();

// 添加评论(当前不可用)
router.post('/createcommment', require('./createComment'))

module.exports = router;