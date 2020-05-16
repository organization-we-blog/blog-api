/**
 * @Description: 图片上传
 * @author kimi233
 * @Email 1571356682@qq.com
 * @date 2020/4/30
 * @param req   请求对象
 * @param res   响应对象
 * @requestData file:image/jpg ||  image/png      图片
 * @responseData code:Number    结果状态码
 * @responseData msg:String     结果说明
 * @responseData datas:Array    数据体
 */
const err_logs = require("../../../mongo/models/err_logs");
let multer  = require('multer');

module.exports = function(req,res,tokenObj){//文件上传配置
    let {token} = tokenObj;
    let upload = multer({
        dest: req.userUploadDir,
    });
    //接收的参数名： file
    //dest：文件上传存储目录
    upload.single('file')(req, res, function (err) {
        if(!req.file || req.file.size === 0){
            res.json({code:901,msg: "图片不能为空",  datas: [], token});
        }else if(req.file.mimetype!=="image/png"&&req.file.mimetype!=="image/jpeg"){
            res.json({code:902,msg: "只允许JPG、PNG文件上传",  datas: [], token});
        }else if(req.file.size > 1024*1024){
            res.json({code:903,msg: "只小于1MB的图片上传",  datas: [], token});
        } else {
            if (err) {//上传发生未知错误
                err_logs.addErrLog(req,err,__filename);
                res.json({code:500,msg: "服务器繁忙",  datas: [] ,token});
            } else{
                res.json({code:200,msg: "上传成功",  datas: [{filepath: req.userUploadDir.slice(1) + req.file.filename}],token})//返回文件路径
            }
        }
    });
};
