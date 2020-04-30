//验证token
const users = require("../mongo/models/users");
const JWT = require("jsonwebtoken");

let token = {};
token.verify = async function (tokenStr) {
    /**
     * @Description: 验证token，如token合法，返回一个更新后的token和携带数据以及用户信息
     * @params tokenStr   要验证的token字符串
     * @returns null|obj 如果token无效返回null，反之返回新的token和携带数据以及用户信息
    */
    let data;
    try{
        data = JWT.verify(tokenStr,global.TOKEN.JWT_STRING)||{}; //2.解析token,当token过期时会抛出错误
        let {exp = 0} = data, current = Math.floor(Date.now() / 1000);
        if(exp >= current){//token未过期
            //3.验证token中的密码和用户名是否正确
            let {username,password} = data.params;
            if(!username ||  !password){
                throw new Error("用户名或密码无效")
            }
            let user = await users.findOne({username,password});
            if(user){//密码用户正确
                //4.更新token并返回
                data.exp = current + 60*60*3;//过期时间3小时
                return {
                    token:JWT.sign(data,global.TOKEN.JWT_STRING),
                    params:data.params,
                    userInfo: user
                }
            }else {
                throw new Error("用户名或密码无效")
            }
        }else {
            throw new Error("token过期")
        }
    }catch (e) {
        return null
    }
};

token.init = function (params) {
    /**
     * @Description: 生成一个token
     * @params params   token中要携带的参数
     * @returns String 返回一个新的token字符串
    */
    //获取当前时间作为token创建时间（秒）
    let createdTime = Math.floor(Date.now() / 1000);
    // 生成Token
    return JWT.sign({
        params,
        exp: createdTime + 60*60*3  //3一小时后过期
    },global.TOKEN.JWT_STRING);
};

token.isAdmin = async function(req, res,callback){
    /**
     * @Description: 验证当前用户是否拥有admin权限,如果拥有权限会执行callback(req, res),如果没有admin权限会自动响应
     * @params req   请求对象
     * @params res   响应对象
     * @params callback   当拥有admin权限时执行的回调
     */
    if(req.headers.token){
        let tokenIsOk = await token.verify(req.headers.token);//验证token
        if(tokenIsOk){//token有效
            if(tokenIsOk.userInfo.role === "admin"){//用户是admin角色
                req.tokenObj = tokenIsOk;//将token解析结果挂着到req上
                await callback(req, res);
            }else {
                return res.json({code:4,msg:"该接口需要提供admin权限，您没有权限访问该接口",datas:[]})
            }
        }else {
            return res.json({code:3,msg:"该接口需要提供admin权限，您的令牌已经失效",datas:[]})
        }
    }else {
        return res.json({code:2,msg:"该接口需要提供admin权限，您还未登陆",datas:[]})
    }
};

module.exports = token;
