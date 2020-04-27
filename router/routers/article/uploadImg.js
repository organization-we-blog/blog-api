const err_logs = require("../../../mongo/models/err_logs");
const fs = require('fs');
let multer  = require('multer');
let upload = multer({ dest: 'uploads/ArticleContents/' });//文件上传配置
//接收的参数名： file
//dest：文件上传存储目录
module.exports = function(req,res){
        upload.single('file')(req, res, function (err) {
            /*
            * 当没有上传文件时req.file为空
            * 当有文件上传时req.file为以下内容
                * fieldname	表单中指定的字段名称
                * originalname	用户计算机上文件的名称
                * encoding	文件的编码类型
                * mimetype	文件的哑剧类型
                * size	文件大小（以字节为单位）
                * destination	文件已保存到的文件夹
                * filename	文件中的文件名
                * path	上载文件的完整路径
            * 例子：
                *   {
                    * fieldname: 'file',
                    * originalname: 'en.md',
                    * encoding: '7bit',
                    * mimetype: 'text/markdown',
                    * destination: '/uploads/ArticleContents',
                    * filename: 'accae7f9aafe779c94f9f9df931bb4b7',
                    * path: '\\uploads\\ArticleContents\\accae7f9aafe779c94f9f9df931bb4b7',
                    * size: 69
                 *   }
            * */
            if(!req.file || req.file.size === 0){
                res.json({code:0,msg: "图片不能为空",  datas: []});
            }else {
                if (err) {//上传发生未知错误
                    err_logs.addErrLog(req,err,__filename);
                    res.statusCode = 500;
                    res.json({code:0,msg: "上传失败",  datas: []});
                } else{
                    res.json({code:1,msg: "上传成功",  datas: [{filepath: "/uploads/ArticleContents/" + req.file.filename}]})//返回文件路径
                }
            }
        });
};
