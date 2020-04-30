/**
 * @Description: 添加文章分类
 * @author kimi233
 * @Email 1571356682@qq.com
 * @date 2020/4/22
 * @param req   请求对象
 * @param res   响应对象
 * @requestData className:String       分类名
 * @responseData code:Number    结果状态码
 * @responseData msg:String     结果说明
 * @responseData datas:Array    数据体
*/
const categorys = require("../../../mongo/models/categorys");
const err_logs = require("../../../mongo/models/err_logs");

module.exports = async function(req,res){
    try {
        let {className} = req.body;
        className = className.trim();
        if(!className){
            return res.json({code:0, msg: "分类名字不能为空", datas: []});
        }else if(className.length<2 || className.length>20){
            return res.json({code:0, msg: "分类名字长度只能在2-20之间", datas: []});
        }else{
            if(await categorys.findOne({className})){
                return res.json({code:0, msg: "分类名已经存在", datas: [],token:req.tokenObj.token})
            } else {
                let categoryDoc = new categorys({className});
                let doc = await categoryDoc.save();
                await res.json({code:1, msg: "添加成功", datas: [doc],token:req.tokenObj.token})
            }
        }
    }catch (e) {
        err_logs.addErrLog(req,e,__filename);
        return res.json({code:500, msg: "添加失败", datas: []})
    }

};
