/**
 * @Description: 添加文章标签
 * @author kimi233
 * @Email 1571356682@qq.com
 * @date 2020/4/22
 * @param req   请求对象
 * @param res   响应对象
 * @requestData tagName:String       标签名
 * @responseData code:Number    结果状态码
 * @responseData msg:String     结果说明
 * @responseData datas:Array    数据体
*/

const tags = require("../../../mongo/models/tags");
const err_logs = require("../../../mongo/models/err_logs");

module.exports = function(req,res){
    let {tagName} = req.body;
    if(!tagName){
        res.json({code:0, msg: "标签名字不能为空", datas: []});
    }else if(tagName.length<2 || tagName.length>20){
        res.json({code:0, msg: "标签名字长度只能在2-20之间", datas: []});
    }else{
        let tagDoc = new tags({tagName});
        tagDoc.save(function (err,doc) {
            if(err){
                err_logs.addErrLog(req,err,__filename);
                res.statusCode = 500;
                res.json({code:0, msg: "添加失败", datas: []})
            }else {
                res.json({code:1, msg: "添加成功", datas: [doc]})
            }
        })
    }
};

