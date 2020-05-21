const ErrLogModel = require('../../../mongo/models/err_logs');
const {isObjectId} = require('../../../util/TypeVerift');

module.exports = async (req, res, tokenObj) => {
  //获取要修改的错误日志id和负责人id
  const {principalId, errLogId}= req.body;
  
  //验证id合法性
  if(!isObjectId(principalId))
    return res.json({code: 902, msg: '负责人id不合法', data: []})
  if(!isObjectId(errLogId))
    return res.json({code: 902, msg: '日志id不合法', data: []})
  //判断日志是否存在
  const exist = await ErrLogModel.findOne({_id: errLogId})
  
  //不存在：返回错误信息
  if(!exist)
    return res.json({code: 802, msg: '日志id不存在', data: []})
  
  //存在：修改所有错误信息与url与这一个相同的日志
  const {url, err_msg} = exist
  const {nModified} = await ErrLogModel.updateMany({url, err_msg}, {principal: principalId})
  
  //判断是否修改成功
  if (nModified <= 0)
    return res.json({code: 902, update_num: nModified, msg: '更新失败，请勿选择与原来相同的负责人', data: []});
  
  //查询并返回修改后的日志信息
  const data = await ErrLogModel.findOne({_id: errLogId});
  res.json({data, update_num: nModified, code: 200, msg: '更新成功'});
}
