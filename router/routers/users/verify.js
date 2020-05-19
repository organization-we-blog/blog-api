/**
 * @Description: 说明
 * @author kimi233
 * @Email 1571356682@qq.com
 * @date 2020/5/14
 * @param req   请求对象
 * @param res   响应对象
 * @requestData key:type       要验证的字段
 * @requestData value:type       要验证的值
 * @responseData code:Number    结果状态码
 * @responseData msg:String     结果说明
 * @responseData datas:Array    数据体
 */
const err_logs = require("../../../mongo/models/err_logs")
const users = require("../../../mongo/models/users")

module.exports = async function (req,res) {
    try {
        let {key, value} = req.query;
        if(key && value){
            let keys = ["username", "password"];//可以验证的key
            if(keys.includes(key)){
                switch (key) {
                    case "username":{
                        //验证用户名规范
                        if(value.length>20 || value.length<2){
                            return  res.json({code: 901, msg: "用户名长度只能在2-20之间", datas: []})
                        }
                        //验证用户名是否已经存在
                        let s = await users.findOne({key: value})
                        if(s){
                            return res.json({code: 801, msg: "用户名已存在", datas: []})
                        }else {
                            return res.json({code: 200, msg: "可用", datas: []})
                        }
                    }
                    case "password":{
                        if(value.length < 6 || value.length > 20 || !(/^[0-9a-zA-Z]{6,20}$/.test(value))){
                            return  res.json({code: 801, msg: "密码只能由6-18位数字或字符组成", datas: []})
                        }else {
                            return res.json({code: 200, msg: "可用", datas: []})
                        }
                    }

                }
            }else {
                return res.json({code: 902, msg: "该字段不在验证范围内", datas: []})
            }
        }else {
            return  res.json({code: 903, msg: "字段值缺少", datas: []})
        }
    }catch (e) {
        res.json({code: 500, msg: "服务器繁忙", datas: []})
        err_logs.addErrLog(req,e,__filename);
    }
}
