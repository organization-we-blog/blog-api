const articles = require("../../../mongo/models/articles");
const tags = require("../../../mongo/models/tags");
const classifys = require("../../../mongo/models/classifys");
const err_logs = require("../../../mongo/models/err_logs");
const moment = require('moment');//格式化时间的插件


module.exports = async function (req,res) {
    let {title, synopsis, filepath,classify,tag} = req.body;//接收请求数据
    let time = moment().format("YYYY-MM-DD HH:mm:ss");//获取当前时间
    if(!isNaN(title&&synopsis&&filepath&&classify&&tag || typeof tag !== "object")) {//验证请求数据是否齐全(全部为true结构为发false)
        res.json({code:0, msg: "携带数据不符合要求，请求驳回", datas: []})
    }else {
        //插入文章到数据库
        await articles.create({title, synopsis, filepath, create_time:time, update_time:time, classify, tag, pv:0, good:0, bad:0},function (err,doc) {
            if(err){
                err_logs.addErrLog(req,"数据库","存储错误",__filename);//存错误日志
                res.statusCode = 500;//给500
                res.json({code:0,msg: "error",datas: []})//响应
            }else {
                res.json({code:1, msg:"ok", datas: [doc]})//响应
            }
        });
        //将对应文分类下的sum+1
        await classifys.updateOne({_id:classify},{$inc:{sum:1}},function (err, doc) {
            if(err){
                err_logs.addErrLog(req,"数据库","修改错误",__filename);//存错误日志
            }
        });
        //将对应文分类下的sum+1
        await tags.updateMany({_id:{$in:tag}},{$inc:{sum:1}},function (err, doc) {
            if(err){
                err_logs.addErrLog(req,"数据库","修改错误",__filename);//存错误日志
            }
        });
    }
};
