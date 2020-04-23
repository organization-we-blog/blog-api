const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const err_log = new Schema({
    ip: String,//来访ip
    type: String,//访问类型
    date: {type: Date, default: Date.now},//来访时间
    err_type:String,//错误类型
    err_msg: String,//错误信息
    req_data: String,//访问携带的数据
    err_file: String,//错误所在文件
    err_status: {type:Number, default: 0},//错误状态
});

let err_logs = mongoose.model('err_logs', err_log);

function getClientIp(req) {//获取用户ip
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}

err_logs.addErrLog = function(req,err_obj,err_file){
    if(err_obj instanceof Error){//检测err_obj是否是一个错误对象
        //获取ip
        let ip = getClientIp(req);
        //访问类型
        let type = req.method;
        //时间
        let date = new Date();
        //请求数据
        let req_data = JSON.stringify({body:req.body,query:req.query});
        //错误状态（0：未修复，1：已修复）
        let err_status = 0;
        //错误类型
        let err_type = err_obj.name;
        //错误信息
        let err_msg = JSON.stringify(err_obj.stack);
        //将错误日志存入数据库
        this.create({ip,type,err_type,err_msg,req_data,err_file,err_status},function (err) {
            if(err){//错误日志存储出错（错上加错）
                //将错误信息存储到json文件中
                const fs = require("fs");
                fs.readFile("../../errorLog.json",function (error,data) {
                    if(error){//3三层错误，没救了
                        console.log("出现连环错误，以下是该过程的错误信息 错误起源>数据库存储日志错误>文件读取日志错误");
                        console.log({ip,type,time,err_type,err_msg,req_data,err_file,err_status});//错误起源
                        console.log(err);//数据库存储日志错误
                        console.log(error);//文件读取日志错误
                    }else {
                        let datas = JSON.parse(data)||[];
                        let dataErr = {
                            start_err: {ip,type,date,err_type,err_msg,req_data,err_file,err_status},//原始错误信息
                            bd_err: err//数据库错误信息
                        };
                        datas.push(dataErr);//存入json文件
                        fs.writeFile('../../errorLog.json',JSON.stringify(datas),function (write_err) {
                            if(write_err){
                                console.log("出现连环错误，以下是该过程的错误信息 错误起源>数据库存储日志错误>文件存储日志错误");
                                console.log({ip,type,date,err_type,err_msg,req_data,err_file,err_status});//错误起源
                                console.log(err);//数据库存储日志错误
                                console.log(write_err);//文件存储日志错误
                            }
                        })
                    }
                })
            }
        })
    }else {
        console.log(new Error("这里要求传入一个错误对象，位于" + err_file));
    }
};

module.exports = err_logs;

