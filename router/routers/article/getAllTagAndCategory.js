/**
 * @Description: 获取所有文章标签和分类信息
 * @author kimi233
 * @Email 1571356682@qq.com
 * @date 2020/4/30
 * @param req   请求对象
 * @param res   响应对象
 * @responseData code:Number    结果状态码
 * @responseData msg:String     结果说明
 * @responseData datas:Array    数据体
*/
const err_logs = require("../../../mongo/models/err_logs");
const tags = require("../../../mongo/models/tags");
const categorys = require("../../../mongo/models/categorys");

module.exports = async function (req,res) {
    try {
        let tagDocs = await tags.find({});
        let categoryDocs = await categorys.find({});
        await res.json({code: 200, msg: "获取数据成功", datas: [{tags: tagDocs, categorys:categoryDocs}]})
    }catch (e) {
        err_logs.addErrLog(req,e,__filename);//存错误日志
        await res.json({code:500,msg: "获取数据失败",datas: []});
    }
};
