const articles = require("../../../mongo/models/articles");
const err_logs = require("../../../mongo/models/err_logs");

module.exports = function (req,res) {
    if(req.body.id){
        articles.findByIdAndRemove(req.body.id,function (err,doc) {//删除并返回
            if(err){//id不存在也会触发err（疑似攻击行为）
                err_logs.addErrLog(req,"数据库","数据库删除错误",__filename);//添加错误日志
                res.statusCode = 500;//给500码
                res.json({code:0, msg:"服务器繁忙", datas:[]})
            }else{
                res.json({code:1, msg:"删除成功", datas:[doc]})
            }
        })
    }else {
        res.json({code:0, msg:"携带数据不符", datas:[]})
    }

};
