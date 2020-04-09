# we-blog API



## 项目概况
we-blog的api项目，只要为web页面数据和操作数据库

## 技术栈
`node`  `javascript`  `express`  `mongoDB`  `mongoose`

## 项目结构

> config    //配置文件目录
> > index.js 	//配置文件，包含数据库信息
>
> mongo
> > models      //数据库的所有models（表结构）
>
> public     //公共文件夹
>
> router
> > routers     //路由执行的代码
> >
> > index.js    //路由规则
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

+ webStorm	IDE
+ vsCode         IDE
+ postman       接口测试





## 分支

- master // 主干
- dev // 开发





## Run

安装依赖

```shell
npm install
```



运行

```shell
npm run serve

##为了方便各位大牛的相关，我们同样开启了dev脚本
npm run dev
```

git init 
git add README.md 
git commit -m“首次提交” 
git remote add origin https://github.com/organization-we-blog/bolg-api.git
 git push -u原始主机

