/**
 * @Description: 获取文章列表页所需信息
 * @author kimi233
 * @Email 1571356682@qq.com
 * @date 2020/4/30
 * @param req   请求对象
 * @param res   响应对象
 * @responseData code:Number    结果状态码
 * @responseData msg:String     结果说明
 * @responseData datas:Array    数据体
*/
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
        //docs.category = docs.category[0];
        for(let i=0; i<docs.length; i++){
            docs[i].category = docs[i].category[0];
            docs[i].author = docs[i].author[0];
        }
        await res.json({code:1,msg: "文章获取成功",datas: docs});
    }catch (e) {
        console.log(e);
        err_logs.addErrLog(req,e,__filename);//存错误日志
        await res.json({code:500,msg: "文章获取失败",datas: []});
    }
};
