/**
 * @Description: 按文章id删除文章
 * @author kimi233
 * @Email 1571356682@qq.com
 * @date 2020/4/22
 * @param req   请求对象
 * @param res   响应对象
 * @requestData id:ObjectId       文章id
 * @responseData code:Number    结果状态码
 * @responseData msg:String     结果说明
 * @responseData datas:Array    数据体
*/
const articles = require("../../../mongo/models/articles");
const err_logs = require("../../../mongo/models/err_logs");
const { isObjectId } = require("../../../public/type_verify");

module.exports = async function (req,res) {
    try {
        let {id} = req.body;
        if(isObjectId(id)){//id合法
            let DelArtDoc = await articles.findByIdAndRemove(id);
            if(DelArtDoc){//结果判空
                await res.json({code:1, msg:"删除成功", datas:[DelArtDoc]});
            }else{
                await res.json({code:0, msg:"该文章不存在", datas:[]});
            }
        }else {
            if(!id){
                await res.json({code:0, msg:"文章id不能为空", datas:[]});
            }else {
                await res.json({code:0, msg:"这不是一个合法的文章id", datas:[]});
            }
        }
    }catch (e) {
        console.log(e);
        err_logs.addErrLog(req,e,__filename);
        await res.json({code:0, msg: "删除失败", datas: []})
    }
};
new Error()
