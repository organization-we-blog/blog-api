const mongoose = require("mongoose");
const moment = require('moment');


const Schema = mongoose.Schema;

const err_log = new Schema({
    ip: String,//来访ip
    type: String,//访问类型
    time: String,//来访时间
    err_type:String,//错误类型
    err_msg: Object,//错误信息
    req_data: Object,//访问携带的数据
    err_file: String,//错误所在文件
    err_status: Number,//错误状态
});

function getClientIp(req) {//获取用户ip
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}


let err_logs = mongoose.model('err_logs', err_log);
err_logs.addErrLog = function(req,err_type,err_msg,err_file){
    //获取ip
    let ip = getClientIp(req);
    //访问类型
    let type = req.method;
    //获取当前时间
    let time = moment().format("YYYY-MM-DD HH:mm:ss");
    //请求数据
    let req_data = req.body || req.query;
    //错误状态（0：未修复，1：已修复）
    let err_status = 0;


    //将错误日志存入数据库
    this.create({ip,type,time,err_type,err_msg,req_data,err_file,err_status},function (err) {
        if(err){//错误日志存储出错（错上加错）
            //将错误信息存储到json文件中
            const fs = require("fs");
            fs.readFile("../../errorLog.json",function (error,data) {
                if(error){//3三层错误，没救了
                    console.log("出现连环错误，以下是该过程的错误信息 错误起源》数据库存储日志错误》文件读取日志错误");
                    console.log({ip,type,time,err_type,err_msg,req_data,err_file,err_status});//错误起源
                    console.log(err);//数据库存储日志错误
                    console.log(error);//文件读取日志错误
                }else {
                    let datas = JSON.parse(data)||[];
                    let dataErr = {
                        start_err: {ip,type,time,err_type,err_msg,req_data,err_file,err_status},//原始错误信息
                        bd_err: err//数据库错误信息
                    };
                    datas.push(dataErr);//存入json文件
                    fs.writeFile('../../errorLog.json',JSON.stringify(datas),function (write_err) {
                        if(write_err){
                            console.log("出现连环错误，以下是该过程的错误信息 错误起源》数据库存储日志错误》文件存储日志错误");
                            console.log({ip,type,time,err_type,err_msg,req_data,err_file,err_status});//错误起源
                            console.log(err);//数据库存储日志错误
                            console.log(write_err);//文件存储日志错误
                        }
                    })
                }
            })
        }
    })

};




module.exports = err_logs;

