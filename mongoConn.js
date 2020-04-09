const mongoose = require("mongoose");
const {USER_NAME,PASSWORD,HOST,PORT,DATABASE} = require("./config/index.js").DATABASE.READ_WRITE_USER;

const uri = `mongodb://${USER_NAME}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;
mongoose.connect(uri, {//mongoDB连接不需要断开，全程保持连接状态即可，服务关闭时会自动断开
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once("open",function(){
    console.log("数据库连接中");
});

mongoose.connection.on("error",function(){
    console.log("数据库连接失败");
});

mongoose.connection.once("close",function(){
    console.log("数据库连接已经断开");
});
