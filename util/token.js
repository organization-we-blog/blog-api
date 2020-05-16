//验证token
const users = require("../mongo/models/users");
const JWT = require("jsonwebtoken");
//公钥
const JWT_STRING =  "kimi233";

class TokenObj {
    constructor(token,params,userInfo) {
        this.token = token;
        this.params = params;
        this.userInfo = userInfo;
    }
}

let token = {};
token.verify = async function (tokenStr) {
    /**
     * @Description: 验证token，如token合法，返回一个更新后的token和携带数据以及用户信息
     * @params tokenStr   要验证的token字符串
     * @returns null|TokenObj 如果token无效返回null，反之返回新的token和携带数据以及用户信息
    */
    let data;
    try{
        data = JWT.verify(tokenStr,JWT_STRING)||{}; //2.解析token,当token过期时会抛出错误
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
                return new TokenObj(this.init(user.username, user.password), data.params, user)
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

token.init = function (username, password) {
    //返回一个token(str)
    /**
     * @Description: 生成一个token
     * @params username   token中要携带的username
     * @params password   token中要携带的password
     * @returns String 返回一个新的token字符串
    */
    //获取当前时间作为token创建时间（秒）
    let createdTime = Math.floor(Date.now() / 1000);
    // 生成Token
    return JWT.sign({
        params: {username, password},
        exp: createdTime + 60*60*3  //3一小时后过期
    },JWT_STRING);
};

token.filterRole = function(roles, callback){
    //过滤用户角色,只允许roles(string|array)中的角色通过,返回一个function (req, res)函数
    /**
     * @Description: 验证当前用户是否拥有指定权限,如果拥有权限会执行callback(req, res),如果没有admin权限会自动响应
     * @params roles  [string|array]允许通过的角色
     * @params callback   当拥有admin权限时执行的回调
     * @returns function (req, res)
     */
    if(!Array.isArray(roles)){
        roles = [roles];
    }
    return function (req, res) {
        if(req.headers.token){
            token.verify(req.headers.token)
                .then((tokenObj)=>{
                    if(roles.includes(tokenObj.userInfo.role)){
                        //权限符合,执行指定接口的处理函数，并多传入一个token的解析结果
                        return callback(req, res, tokenObj);
                    }else {
                        //用户角色权限不足
                        return res.json({code:403,msg:`该接口需要提供${roles.join("或")}权限，您没有权限访问该接口`,datas:[]})
                    }
                })
                .catch(()=>{
                    //token失效
                    return res.json({code:403,msg:`该接口需要提供${roles.join("或")}权限，您的令牌已经失效`,datas:[]})
                });
        }else {
            //无token
            return res.json({code:403,msg:`该接口需要提供${roles.join("或")}权限，您还未登陆`,datas:[]})
        }
    }
};

module.exports = token;
