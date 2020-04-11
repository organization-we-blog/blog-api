const classifys = require("../../../mongo/models/classifys");//分类集合的model
const err_logs = require("../../../mongo/models/err_logs");//错误日志集合的model

module.exports = function(req,res){
    if(typeof (req.body.classValue) === "string" && req.body.classValue.length>0){//接收到合法的指定值（classValue存在并且不是空）
        classifys.create({value: req.body.classValue,sum: 0},function(err){//插入数据库
            if(err){//插入出错
                err_logs.addErrLog(req,"数据库错误","数据库存储错误",__filename);//存日志
                res.statusCode = 500;//给500码
                res.json({code:0, msg: "error",datas: []})//响应
            }
            else {//查询成功
                res.json({code:1, msg: "ok", datas: []})//响应
            }
        })
    }
    else{//没有接受都合法的指定值
        res.json({code:0, msg: "携带数据不符合要求，请求驳回",datas: []})//响应
    }
};
