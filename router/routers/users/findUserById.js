const UserModel = require("../../../mongo/models/users");

module.exports = async (req, res) => {
  // 获取用户id
  const id = req.params['id'];
  // 判断id是否存在
  if (!id) {
    return res.send({ code: 1, msg: '用户id不能为空', datas: [] })
  }
  // 通过验证
  // 查询用户信息
  try {
    const user = await UserModel.findById(id).select('-password');
    // 响应
    return res.send({ code: 0, msg: '查询用户成功', datas: user });
  } catch{
    return res.send({ code: 1, msg: '用户不存在', datas: [] })
  }
};