const articles = require("../../../mongo/models/articles");
const err_logs = require("../../../mongo/models/err_logs");
const tags = require("../../../mongo/models/tags");
const categorys = require("../../../mongo/models/categorys");
const users = require("../../../mongo/models/users");

module.exports = async function (req,res) {
    try {
        let docs =  await articles.find({},{_id:1,title:1,category:1,author:1,create_time:1,update_time:1,meta:1})
            .populate({ path: 'category', select: { className: 1 } })
            .populate({ path: 'author', select: { username: 1 } });
        await res.json({code:1,msg: "获取数据成功",datas: docs});
    }catch (e) {
        err_logs.addErrLog(req,e,__filename);//存错误日志
        res.statusCode = 500;//给500
        await res.json({code:0,msg: "获取数据失败",datas: []});
    }
};
