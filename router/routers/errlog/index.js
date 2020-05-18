const {Router} = require('express');
const router = Router();
const {filterRole} = require("../../../util/token");

//根据状态获取错误日志
router.get('/errLog/getErrLog', require('./getErrLog'));
//根据id修改错误日志
// router.put('/errLog/updateErrLogById/:id', filterRole('admin', require('./updateErrLogById')) );
router.put('/errLog/updateErrLogById/:id', require('./updateErrLogById'));
module.exports = router;
