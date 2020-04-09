const articles = require("../../../mongo/models/articles");
const err_logs = require("../../../mongo/models/err_logs");
const moment = require('moment');


module.exports = function (req,res) {
    let {title, synopsis, filepath,classify,tag} = req.body;
    let time = moment().format("YYYY-MM-DD HH:mm:ss");
    if(!isNaN(title&&synopsis&&filepath&&classify&&tag)) {
        res.statusCode = 801;
        res.json({msg: "携带数据不符合要求，请求驳回",result: []})
    }else {
        articles.create({title, synopsis, filepath, create_time:time, update_time:time, classify, tag, pv:0, good:0, bad:0},function (err,doc) {
            if(err){
                err_logs.addErrLog(req,"数据库","存储错误",__filename);//存错误日志
                res.statusCode = 500;//给500
                res.json({msg: "error",result: []})//响应
            }else {
                res.json({msg: "ok",result: [doc]})//响应
            }
        })
    }

};
