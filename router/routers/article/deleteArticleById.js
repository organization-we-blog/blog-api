const articles = require("../../../mongo/models/articles");
const tags = require("../../../mongo/models/tags");
const classifys = require("../../../mongo/models/category");
const err_logs = require("../../../mongo/models/err_logs");

module.exports = async function (req,res) {
    if(req.body.id){
        try {
            let articleDoc = await articles.findByIdAndRemove(req.body.id);//删除数据库对应文章数据(不使用回调，出现异常会被抛出)
            res.json({code:1, msg:"删除成功", datas:[articleDoc]});

            let {tag, classify} = articleDoc;
            //对被删除的文章对应得到classifys和tags的sum做-1操作
            classifys.updateOne({_id:classify},{$inc:{sum:-1}},function (err, doc ) {//使用回调，异常不抛出
                if(err){
                    err_logs.addErrLog(req,"数据库",err,__filename);
                }
            });
            tags.updateMany({_id:{$in:tag}},{$inc:{sum:-1}},function (err, doc) {//使用回调，异常不抛出
                if(err){
                    err_logs.addErrLog(req,"数据库",err,__filename);
                }
            });
        }catch (err) {//只接受删除操作的异常
            err_logs.addErrLog(req,"数据库",err,__filename);
            res.json({code:0, msg:"删除失败", datas:[]})
        }
    }else {
        res.json({code:0, msg:"携带数据不符", datas:[]})
    }

};
