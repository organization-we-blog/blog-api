let fs = require("fs");

// 图片文件上传
module.exports = async function (req, res) {
    let file = req.file;
    fileInfo = {};
    if (!file) {
        return res.send({ code: 1, msg: '上传文件失败', datas: [] })
    }
    //修改文件名字, 防止上传重复的文件
    fs.renameSync('./public/uploads/' + file.filename, './public/uploads/' + file.originalname);
    // 设置响应类型及编码
    res.set({
        'content-type': 'application/json; charset=utf-8'
    });
    // 返回文件地址
    filePath = '/public/uploads/' + file.originalname
    fileInfo.avatar = filePath

    res.send({ code: 0, msg: '上传成功', datas: [fileInfo] })
    // res.send({result: {filepath: "/uploads/" + req.file.filename}, msg: "ok", status_code: 200})
};
