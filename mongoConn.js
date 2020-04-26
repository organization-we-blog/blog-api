const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const {USER_NAME,PASSWORD,HOST,PORT,DATABASE} = require("./config/index.js").DATABASE.READ_WRITE_USER;

const uri = `mongodb://${USER_NAME}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;//连接名
mongoose.connect(uri, {//mongoDB连接不需要断开，全程保持连接状态即可，服务关闭时会自动断开
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once("open",function(){
    console.log("数据库连接成功");
    /*global.datadase={
        state:1,//数据库处于连接状态
    }*/
    //推送给后台（规划）
});

mongoose.connection.on("error",function(){
    console.log("数据库连接失败");
    /*global.datadase={
        state:0,//数据库处于断开状态
    }*/
    //推送给后台（规划）
});

mongoose.connection.once("close",function(){
    console.log("数据库连接断开");
    /*global.datadase={
        state:0,//数据库处于断开状态
    }*/
    //推送给后台（规划）
});
