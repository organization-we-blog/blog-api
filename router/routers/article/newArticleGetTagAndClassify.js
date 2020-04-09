const classifys = require("../../../mongo/models/classifys");
const tags = require("../../../mongo/models/tags");
const err_logs = require("../../../mongo/models/err_logs");

module.exports = async function(req,res) {
    //查询所有分类和标签
    let classify = await classifys.find({},{value:true,_id:false},function (err,docs) {
        if(err){
            err_logs.addErrLog(req,"数据库","数据库读取错误",__filename);//添加错误日志
            res.statusCode = 500;//给500码
            res.json({msg: "error",result: []})//响应
        }else {
            return docs;
        }
    });
    let tag = await tags.find({},{value:true,_id:false},function (err,docs) {
        if(err){
            err_logs.addErrLog(req,"数据库","数据库读取错误", __filename);//添加错误日志
            res.statusCode = 500;//给500码
            res.json({msg: "error",result: []})//响应
        }else {
            return docs;
        }
    });
    classify = classify.map((value)=>{
        return value.value;
    });
    tag = tag.map((value)=>{
        return value.value;
    });
    await res.json({msg: "ok",result: [{classify, tag}]})
};
