/**
 * @Description: 添加文章标签
 * @author kimi233
 * @Email 1571356682@qq.com
 * @date 2020/4/22
 * @param req   请求对象
 * @param res   响应对象
 * @requestData tagName:String       标签名
 * @requestData tagColor:String       标签专属色
 * @responseData code:Number    结果状态码
 * @responseData msg:String     结果说明
 * @responseData datas:Array    数据体
*/

const tags = require("../../../mongo/models/tags");
const err_logs = require("../../../mongo/models/err_logs");

module.exports = async function(req,res,tokenObj){
    try {
        let {tagName,tagColor} = req.body;
        tagName = tagName.trim();
        tagColor = tagColor.trim();
        if(!tagName){
            return res.json({code:901, msg: "标签名字不能为空", datas: []});
        }else if(tagName.length<2 || tagName.length>20){
            return res.json({code:902, msg: "标签名字长度只能在2-20之间", datas: []});
        }else if(!tagColor){
            return res.json({code:903, msg: "标签颜色不能为空", datas: []});
        }else if(!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(tagColor)){
            return res.json({code:904, msg: "标签颜色要求使用16进制格式", datas: []});
        } else{
            //验证标签名是否已经存在
            if(await tags.findOne({tagName})){
                return res.json({code:801, msg: "标签名已经存在", datas: [],token:tokenObj.token})
            }else {
                //保存标签
                let tagDoc = new tags({tagName,tagColor});
                let doc = await tagDoc.save();
                await res.json({code:200, msg: "添加成功", datas: [doc],token:tokenObj.token})
            }
        }
    }catch (e) {
        err_logs.addErrLog(req,e,__filename);
        return res.json({code:500, msg: "添加失败", datas: []})
    }

};

