const err_logs = require("../../../mongo/models/err_logs");
const tags = require("../../../mongo/models/tags");
const categorys = require("../../../mongo/models/categorys");

module.exports = async function (req,res) {
    try {
        let tagDocs = await tags.find({});
        let categoryDocs = await categorys.find({});
        if(tagDocs && categoryDocs){
            await res.json({code: 1, msg: "获取数据成功", datas: [{tags: tagDocs, categorys:categoryDocs}]})
        }else {
            await res.json({code: 1, msg: "获取数据失败", datas: []})
        }
    }catch (e) {
        err_logs.addErrLog(req,e,__filename);//存错误日志
        res.statusCode = 500;//给500
        await res.json({code:0,msg: "获取数据失败",datas: []});
    }
};
