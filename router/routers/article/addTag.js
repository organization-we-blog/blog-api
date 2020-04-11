const tags = require("../../../mongo/models/tags");
const err_logs = require("../../../mongo/models/err_logs");


module.exports = function(req,res){
    if(typeof (req.body.tagValue) === "string" && req.body.tagValue.length>0){//接收到合法的指定值
        tags.create({value: req.body.tagValue,sum:0},function(err){
            if(err){
                err_logs.addErrLog(req,"数据库错误","数据库存储错误",__filename);//存日志
                res.statusCode = 500;//给500码
                res.json({code:0, msg: "error",datas: []})//响应
            }
            else {
                res.json({code:1, msg: "ok", datas: []})//响应
            }
        })
    }
    else{
        res.json({code:0, msg: "携带数据不符合要求", datas: []})//响应
    }
};

