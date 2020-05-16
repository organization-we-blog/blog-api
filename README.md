# we-blog API

## 注意
请各位大佬阅读完此文件（很短）
请使用dev分支进行开发


## 项目概况
we-blog的api项目，主要为web页面数据和操作数据库

## 技术栈
`node`  `javascript`  `express`  `mongoDB`  `mongoose`

## 项目结构

> config    //配置文件目录
> > TypeVerift.js 	//配置文件，包含数据库信息
>
> mongo
> > models      //数据库的所有models（表结构）
>
> public     //公共文件夹
>
> router
> > routers     //路由执行的代码
> >
> > TypeVerift.js    //路由规则
>
> uploads   //上传文件的存放目录
>
> App.js    //入口文件
>
> errorLog.json     //当错误日志无法存放到数据库时，错误日志的存放文件
>
> mongoConn.js  //连接数据库的文件
>
>package.json // 项目信息文件



## 条件工具

+ webStorm	    IDE
+ vsCode         IDE
+ postman       接口测试





## 分支

- master // 主干
- dev // 开发

请使用dev分支进行开发，凡是直接提交到master的代码最终都将会被驳回
我将会对dev与master的区别代码进行阅读，发现小bug我将修改，发现大bug请提交者修改（请各位大佬写注释，饶过小弟一命）

我会将最新的master部署到服务器上



## Run

安装依赖

```shell
npm install
```



运行

```shell
npm run test
```


