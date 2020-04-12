const UserModel = require("../../../mongo/models/users");
const pagination = require('mongoose-sex-page');
const _ = require('lodash');
const filter = { password: 0, __v: 0 } // 查询时过滤出指定的属性

module.exports = async (req, res) => {
  let { query, pagenum, pagesize } = req.query
  // 当前页   
  let page = +pagenum;
  // 如果页码没有传递, 默认为第一页
  if (!page || !_.isNumber(page)) page = 1;
  // 如果每页显示条数没有传递, 默认显示2条数据
  if (!pagesize) {
    pagesize = 2
  }
  // 如果有查询参数 模糊查询用户信息  相当于用户搜索功能
  if (query) {
    // page()表示当前页，想查询第几页就传什么参
    // size()表示每页显示的条数
    // display()表示客户端要显示的页码数量  dispaly = Math.ceil(total / size) 
    // exec()向数据库发送查询请求  
    let users = await pagination(UserModel).page(page).size(pagesize).display(5).find({ username: { $regex: query } }).select('-password').exec()
    return res.send(users)
  }
  // 如果未传入查询参数, 返回全部用户列表
  let userList = await pagination(UserModel).page(page).size(pagesize).display(5).find().select('-password').exec()
  return res.send(userList)
}