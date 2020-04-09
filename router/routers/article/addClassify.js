const classifys = require("../../../mongo/models/classifys");
const err_logs = require("../../../mongo/models/err_logs");


module.exports = function(req,res){
    if(typeof (req.body.classValue) === "string" && req.body.classValue.length>0){//接收到合法的指定值
        classifys.create({value: req.body.classValue},function(err){
                if(err){
                    err_logs.addErrLog(req,"数据库错误","数据库存储错误",__filename);//存日志
                    res.statusCode = 500;//给500码
                    res.json({msg: "error",result: []})//响应
                }
                else {
                    classifys.find({},function (err,docs) {
                        if(err){
                            err_logs.addErrLog(req,"数据库错误","数据库读取错误",__filename);//存日志
                            res.statusCode = 500;//给500码
                            res.json({msg: "error",result: []})//响应
                        }else {
                            res.json({msg: "ok",result: docs})//响应
                        }
                    });
                }
            })
        }
    else{
        res.statusCode = 801;
        res.json({msg: "携带数据不符合要求，请求驳回",result: []})//响应
    }
};

