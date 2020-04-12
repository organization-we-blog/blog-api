const articles = require("../../../mongo/models/articles");
const err_logs = require("../../../mongo/models/err_logs");

module.exports = function (req,res) {
    articles.find({},function (err,docs) {
        if(err){
            err_logs.addErrLog(req,"数据库","数据库读取错误",__filename);//添加错误日志
            res.statusCode = 500;//给500码
            res.json({code:0, msg: "服务器繁忙",datas: []})//响应
        }else{
            res.json({code:1, msg: "获取成功",datas: docs})//响应
        }
    })
};
