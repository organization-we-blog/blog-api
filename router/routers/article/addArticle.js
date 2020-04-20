/**
 * @Description: 添加文章
 * @author kimi233
 * @Email 1571356682@qq.com
 * @date 2020/4/20
 * @requestData title:String
 * @requestData thumbnail:String
 * @requestData synopsis:String
 * @requestData author:ObjectId
 * @requestData content:String
 * @requestData category:ObjectId
 * @requestData tag:[ObjectId]
 * @responseData code:Number
 * @responseData msg:String
 * @responseData datas:Array
*/
const articles = require("../../../mongo/models/articles");
const err_logs = require("../../../mongo/models/err_logs");

module.exports = function (req,res) {
    let {title, thumbnail, synopsis, author, content,category,tag} = req.body;//接收请求数据
    if(!(title&&thumbnail&&synopsis&&author&&content&&category&&tag) || typeof tag !== "object") {//验证请求数据是否齐全(全部为true结构为发false)
        if(!title){
            res.json({code:0, msg: "文章标题不能为空", datas: []})
        }else if(!thumbnail){
            res.json({code:0, msg: "文章缩略图不能为空", datas: []})
        }else if(!synopsis){
            res.json({code:0, msg: "文章简介不能为空", datas: []})
        }else if(!author){
            res.json({code:0, msg: "文章作者不能为空", datas: []})
        }else if(!content){
            res.json({code:0, msg: "文章内容不能为空", datas: []})
        }else if(!category){
            res.json({code:0, msg: "文章分类不能为空", datas: []})
        }else if(!tag){
            res.json({code:0, msg: "文章标签不能为空", datas: []})
        }else if(typeof tag !== "object"){
            res.json({code:0, msg: "文章标签必须为数组", datas: []})
        }else if(thumbnail.indexOf("/uploads/")!==0){//验证图片路径格式
            res.json({code:0, msg: "图片路径格式不符(/uploads/xxx)", datas: []})
        }else if(title.length<2||title.length>100){
            res.json({code:0, msg: "文章标题长度必须在2-100之间", datas: []})
        }
    }else {
        let newArticle = new articles({
            title,//标题
            thumbnail,//缩略图
            synopsis,//简介
            content,//内容
            author,//用户
            category,//文章分类
            tag,//文章标签
        });
        //插入文章到数据库
        newArticle.save(function (err,doc) {
            if(err){
                err_logs.addErrLog(req,"数据库",err,__filename);//存错误日志
                res.statusCode = 500;//给500
                res.json({code:0,msg: "添加失败",datas: []})//响应
            }else {
                res.json({code:1, msg:"添加成功", datas: [doc]})//响应
            }
        });
    }
};
