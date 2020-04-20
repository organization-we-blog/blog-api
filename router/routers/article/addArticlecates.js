/**
 * @Description: 添加文章分类
 * @author kimi233
 * @Email 1571356682@qq.com
 * @date 2020/4/20
 * @requestData name:type
 * @responseData code:Number
 * @responseData msg:String
 * @responseData datas:Array
*/
const categorys = require("../../../mongo/models/category");
const err_logs = require("../../../mongo/models/err_logs");

module.exports = function(req,res){
    /*let classify = new categorys({
        parent:"5e9d92f61fbbfe29a495ebcb",
        className:"测试1-1-1",
        createTime:new Date()
    });
    classify.save(function (err,doc) {
        if(err){
            console.log(err);
            res.json(err)
        }else {
            console.log(doc);
            res.json(doc)
        }
    })*/
    categorys.find({},function (err,docs) {
        if(err){
            res.json(err)
        }else {
            //尽量不用聚合管道，会增加数据库压力，谢谢
            //将doc数据转化为js数据
            docs = docs.map(value=>value.toObject());
            let f = docs.filter(value=>value.parent === null);//所有顶级分类
            f = JSON.parse(JSON.stringify(f));
            f = f.map(value=>{//添加所有2级分类
                value.child = docs.filter(_ => {
                    return String(value._id) == String(_.parent)
                });
                value.child.map(value=>{//添加所有3级分类
                    value.child = docs.filter(_ => {
                        return String(value._id) == String(_.parent)
                    });
                    return value;
                });
                return value;
            });
            res.json(f);
        }
    })
};
