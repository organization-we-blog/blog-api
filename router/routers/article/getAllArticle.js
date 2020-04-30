const articles = require("../../../mongo/models/articles");
const err_logs = require("../../../mongo/models/err_logs");

module.exports = async function (req,res) {
    try {
        //获取所有公开的文章（不含content，因为content太大）
        let docs =  await articles.aggregate([
            {$match:{state:1}},//条件：状态为1的文章
            {$lookup:{from: "categorys",localField: "category",foreignField: "_id",as: "category"}},
            {$lookup:{from: "users",localField: "author",foreignField: "_id",as: "author"}},
            {$lookup:{from: "tags",localField: "tag",foreignField: "_id",as: "tag"}},
            {$project:{content:0,"author.password":0}},//不查询文章内容,以及作者密码
        ]);
        await res.json({code:1,msg: "文章获取成功",datas: docs});
    }catch (e) {
        err_logs.addErrLog(req,e,__filename);//存错误日志
        res.statusCode = 500;//给500
        await res.json({code:0,msg: "文章获取失败",datas: []});
    }
};
