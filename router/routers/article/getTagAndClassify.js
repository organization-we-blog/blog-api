const classifys = require("../../../mongo/models/category");
const tags = require("../../../mongo/models/tags");
const err_logs = require("../../../mongo/models/err_logs");

module.exports = async function(req,res) {
    //查询所有分类和标签
    let classify = await classifys.find({},{value:true,_id:true,sum:true},function (err,docs) {//查询value和_id字段
        if(err){//查询错误
            err_logs.addErrLog(req,"数据库","数据库读取错误",__filename);//添加错误日志
            res.statusCode = 500;//给500码
            res.json({code:0,msg: "error",datsa: []})//响应
        }else {//查询ok
            return docs;
        }
    });
    let tag = await tags.find({},{value:true,_id:true,sum:true},function (err,docs) {
        if(err){
            err_logs.addErrLog(req,"数据库","数据库读取错误", __filename);//添加错误日志
            res.statusCode = 500;//给500码
            res.json({code:0,msg: "error",datas: []})//响应
        }else {
            return docs;
        }
    });
    await res.json({code:1, msg: "ok",datas: [{classify, tag}]})
};
