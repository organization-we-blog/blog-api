/**
 * @Description: 添加文章
 * @author kimi233
 * @Email 1571356682@qq.com
 * @date 2020/4/20
 * @param req   请求对象
 * @param res   响应对象
 * @requestData title:String 文章标题
 * @requestData thumbnail:String    文章缩略图，要求以/uploads/开头
 * @requestData synopsis:String     文章简介
 * @requestData author:ObjectId     作者用户id
 * @requestData content:String      文章类容
 * @requestData category:ObjectId   文章分类id
 * @requestData tag:[ObjectId]      文章标签id
 * @responseData code:Number        数据状态码
 * @responseData msg:String         结果说明
 * @responseData datas:Array        数据体
 */
const articles = require("../../../mongo/models/articles");
const err_logs = require("../../../mongo/models/err_logs");
const tags = require("../../../mongo/models/tags");
const categorys = require("../../../mongo/models/categorys");
const {isObjectId} = require("../../../util/TypeVerift");

module.exports = async function (req,res,tokenObj) {
    try {
        let {title, thumbnail, synopsis, author, content,category,tag} = req.body;//接收请求数据
        if(!(title&&thumbnail&&synopsis&&author&&content&&category&&tag)
            || !Array.isArray(tag)
            || !isObjectId(author)
            || !isObjectId(category)
            || !isObjectId(tag)) {//验证请求数据是否齐全(全部为true结构为发false)
            if(title && synopsis){
                title = title.trim();
                synopsis = synopsis.trim();
            }
            if(!title){
                return res.json({code:901, msg: "文章标题不能为空", datas: []})
            }else if(!thumbnail){
                return res.json({code:902, msg: "文章缩略图不能为空", datas: []})
            }else if(!synopsis){
                return res.json({code:903, msg: "文章简介不能为空", datas: []})
            }else if(!author){
                return res.json({code:904, msg: "文章作者不能为空", datas: []})
            }else if(!content){
                return res.json({code:905, msg: "文章内容不能为空", datas: []})
            }else if(!category){
                return res.json({code:906, msg: "文章分类不能为空", datas: []})
            }else if(!Array.isArray(tag)){
                return res.json({code:907, msg: "文章标签必须为数组", datas: []})
            }else if(thumbnail.indexOf("/uploads/")!==0){//验证图片路径格式
                return res.json({code:908, msg: "缩略图路径格式不符(/uploads/xxx)", datas: []})
            }else if(title.length<2||title.length>50){
                return res.json({code:909, msg: "文章标题长度必须在2-50之间", datas: []})
            }else if(synopsis.length<2||synopsis.length>200){
                return res.json({code:910, msg: "文章简介长度必须在2-200之间", datas: []})
            }else if(!isObjectId(author)){
                return res.json({code:911, msg: "这不是一个合法的作者id", datas: []})
            }else if(!isObjectId(category)){
                return res.json({code:912, msg: "这不是一个合法的分类id", datas: []})
            }else if(tag.length>0 && !isObjectId(tag)){
                return res.json({code:913, msg: "这不是一个合法的标签id", datas: []})
            }else {
                return res.json({code:914, msg: "参数格式不满足", datas: []})
            }
        }else {
            //验证标题是否存在
            if(await articles.findOne({title})){
                return res.json({code:802, msg:"标题已经存在", datas: [], token:tokenObj.token})
            }
            //查证分类和标签是否存在
            let tagDoc = await tags.find({_id: tag},{_id:true});
            let categoryDoc = await categorys.findOne({_id: category},{_id:true});
            if(tagDoc.length===tag.length && categoryDoc){//标签和分类有效
                let newArticle = new articles({
                    title,//标题
                    thumbnail,//缩略图
                    synopsis,//简介
                    content,//内容
                    author,//用户
                    category,//文章分类
                    tag,//文章标签
                });
                //插入文章
                let newArticleDoc = await newArticle.save();
                await res.json({code:200, msg:"添加成功", datas: [newArticleDoc],token:tokenObj.token})
            }else{//标签或者分类无效
                await res.json({code:801,msg: "标签或分类不存在",datas: []});
            }
        }
    }catch (e) {
        err_logs.addErrLog(req,e,__filename);//存错误日志
        await res.json({code:500,msg: "添加失败",datas: []});
    }

};
