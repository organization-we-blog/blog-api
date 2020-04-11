const UserModel = require("../../../mongo/models/users");

module.exports = async (req, res) => {
  // 获取用户id
  const id = req.params['id'];
  // 如果id中存在-
  if (id.indexOf('-') != -1) {
    // 批量删除
    // 将字符串id分割为数组
    const ids = id.split('-')
    // 存储结果数组
    const result = [];
    // 验证
    for (const item of ids) {
      // 删除用户
      let user = await UserModel.findByIdAndDelete(item)
      // 将删除的用户存储在数组中
      result.push(user)
      // 如果缩略图存在
      if (user.avatar) {
        // 删除缩略图
        await unlink(path.join(__dirname, '../', '../', '../', 'public/uploads/', user.avatar));
      }
    }
    // 响应
    res.send({ code: 0, msg: '批量删除成功', datas: result })
  } else {
    // 单个删除
    // 判断id是否存在
    if (!id) {
      return res.send({ code: 1, msg: '用户id不能为空', datas: [] })
    }
    // 删除用户
    let user = await UserModel.findByIdAndDelete(id);
    if (user.avatar) {
      // 删除缩略图
      await unlink(path.join(__dirname, '../', '../', '../', 'public/uploads/', user.avatar));
    }
    // 响应
    res.send({ code: 0, msg: '删除用户成功', datas: user })
  }
}