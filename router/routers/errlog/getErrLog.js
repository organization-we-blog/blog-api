const ErrLogModel = require('../../../mongo/models/err_logs');

module.exports = async (req, res) => {
  const {state} = req.query;
  switch (state) {
    case '0': {
      const data = await ErrLogModel.find({err_status: 0});
      res.json({data, code: 200, msg: '获取未解决错误日志成功'});
    }
      break;
    case '1': {
      const data = await ErrLogModel.find({err_status: 1});
      res.json({data, code: 200, msg: '获取已解决错误日志成功'});
    }
      break;
    case '2': {
      const data = await ErrLogModel.find({err_status: 2});
      res.json({data, code: 200, msg: '获取排查中错误日志成功'});
    }
      break;
    default:
      res.json({code: 901, msg: '参数错误', data: [],});
  }
}
