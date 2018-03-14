/*
启动服务器应用的模块
1. 引入express
2. 生成应用对象(执行express函数)
3. 注册根路由(使用app的use())
4. 启动服务器(使用app监听指定端口)
 */

// 1. 引入express
const express = require('express')
const bodyParser = require('body-parser') // 解析请求体
const cookieParser = require('cookie-parser') // 解析cookie
const appRouter = require('./appRouter')

// 2. 生成应用对象(执行express函数)
const app = express()

// 3. 注册根路由(使用app的use())
/*app.use('/', function (req, res) {
  res.send('hello gboss server8888')
})*/

app.use(cookieParser()) // 解析cookie数据
app.use(bodyParser.json()) // 解析请求体(ajax请求: json数据格式)
app.use(bodyParser.urlencoded({ extended: false })) // 解析请求体(表单数据)
// 注册上路由器
app.use('/api', appRouter)  // 请求注册: /api/register


// 4. 启动服务器(使用app监听指定端口)
app.listen('4000', function () { // 启动完成调用
  console.log('server start on port: 4000')
})