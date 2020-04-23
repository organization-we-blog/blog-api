 exports.isObjectId = function (id) {
    /**
     * @Description: 验证一个字符串或者对象、数组是否是一个合法的ObjectId
     * @author kimi233
     * @Email 1571356682@qq.com
     * @date 2020/4/22
     * @param str:String   待验证的字符串
     * @return Boolean
    */
    if(typeof id === 'string' || typeof id === 'object'){
        let reg = /^[0-9a-zA-Z]{24}$/;
        if(Array.isArray(id)){
            return id.every(v=>reg.test(v));
        }else {
            let idStr = id.toString() || id;
            return reg.test(idStr);
        }
    }else {
        return false;
    }
};
