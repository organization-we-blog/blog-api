const ErrLogModel = require('../../../mongo/models/err_logs');
const {isObjectId} = require('../../../util/TypeVerift');
module.exports = async (req, res) => {
  //获取错误日志id
  const _id = req.params.id;
  //获取要修改的状态
  const newState = Number(req.body.newState);
  console.log(req.body);
  //验证日志id合法性
  if (!isObjectId(_id))
    return res.json({code: 901, msg: '更新失败，日志id不合法', data: []});
  //更新文档
  const {n, nModified} = await ErrLogModel.updateOne({_id}, {err_status: newState});
  //判断日志是否存在
  if (n === 0)
    return res.json({code: 802, msg: '更新失败，日志id不存在', data: []});
  //判断是否修改成功
  if (nModified === 0)
    return res.json({code: 902, msg: '更新失败，请勿选择与原来相同的状态', data: []});
  //查询并返回修改后的日志信息
  const data = await ErrLogModel.findOne({_id});
  res.json({data, code: 200, msg: '更新成功'});
}
