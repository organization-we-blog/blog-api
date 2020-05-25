const express = require("express");
let bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

require('./mongoConn.js');//连接数据库

const app = express();
require("./global");//加载全局数据

// 配置 body-parser
// 只要 加入这个配置，则在 req 请求对象上会多出一个属性： body
// 你可以通过 req.body 来获取表单POST请求体数据
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cookieParser());

app.use("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "*");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() === 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});

app.use('/public/', express.static('./public/'));
app.use('/uploads/', express.static('./uploads/'));

const { article, users, slide, setting,comment, errLog } = require("./router");
//挂载路由
app.use(article);
app.use(users);
app.use(slide);
app.use(setting);
app.use(comment);
app.use(errLog);

app.use("*", function (req, res) {//404
    res.statusCode = 404;
    res.json({code: 0, msg: "哎啊！找不到对应的接口呢，请检查你的URL是否正确，或者与开发者确定该接口是否已经上线", datas: []})
});

app.listen(3002, () => {
    console.log("server running at http://127.0.0.1:3002");
});

