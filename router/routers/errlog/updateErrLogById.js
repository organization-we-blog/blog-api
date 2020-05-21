const ErrLogModel = require('../../../mongo/models/err_logs');
const {isObjectId} = require('../../../util/TypeVerift');
module.exports = async (req, res, tokenObj) => {
  //获取错误日志id
  const _id = req.params.id;
  
  //获取要修改的状态
  const newState = Number(req.body.newState);
  
  //验证日志id合法性
  if (!isObjectId(_id))
    return res.json({code: 901, msg: '更新失败，日志id不合法', data: []});
  
  //判断日志是否存在
  const exist = await ErrLogModel.findOne({_id})
  
  //不存在：返回错误信息
  if (!exist)
    return res.json({code: 802, msg: '更新失败，日志id不存在', data: []})
  
  //存在：判断是否有操作权限
  const {url, err_msg, principal} = exist
  if(principal !== null && tokenObj.userInfo._id.toString() !== principal.toString())
    return res.json({code: 403, msg:'对不起您没有此操作权限', data:[]})
  
  //修改所有错误信息与url相同的日志
  const {nModified} = await ErrLogModel.updateMany({url, err_msg}, {err_status: newState})
  
  //判断是否修改成功
  if (nModified <= 0)
    return res.json({code: 902, update_num: nModified, msg: '更新失败，请勿选择与原来相同的状态', data: []});
  
  //查询并返回修改后的日志信息
  const data = await ErrLogModel.findOne({_id});
  res.json({data, update_num: nModified, code: 200, msg: '更新成功'});
}
