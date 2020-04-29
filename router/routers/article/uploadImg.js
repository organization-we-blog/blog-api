console.log(new Date());
const err_logs = require("../../../mongo/models/err_logs");
const fs = require('fs');
let multer  = require('multer');

module.exports = function(req,res){//文件上传配置
    console.log(new Date());
    let upload = multer({
        dest: req.userUploadDir,
    });
        //接收的参数名： file
        //dest：文件上传存储目录
    upload.single('file')(req, res, function (err) {
            if(!req.file || req.file.size === 0){
                res.json({code:0,msg: "图片不能为空",  datas: []});
            }else if(req.file.mimetype!=="image/png"&&req.file.mimetype!=="image/jpeg"){
                res.json({code:0,msg: "只允许JPG、PNG文件上传",  datas: []});
            }else if(req.file.size > 1024*1024){
                res.json({code:0,msg: "只小于1MB的图片上传",  datas: []});
            } else {
                if (err) {//上传发生未知错误
                    err_logs.addErrLog(req,err,__filename);
                    res.statusCode = 500;
                    res.json({code:0,msg: "上传失败",  datas: []});
                } else{
                    res.json({code:1,msg: "上传成功",  datas: [{filepath: req.userUploadDir.slice(1) + req.file.filename}]})//返回文件路径
                    console.log(new Date());
                }
            }
        });
};
