/*
后台应用的路由器模块
1. 引入express
2. 得到路由器
3. 注册n个路由
4. 向外暴露路由器
5. 通过 app使用上路由器
 */
// 1. 引入express
const express = require('express')
const md5 = require('blueimp-md5')  // 密文 = md5(明文)
const models = require('./models')
const UserModel = models.getModel('user')
const filter = {pwd: 0} //过滤的条件

// 2. 得到路由器
const router = express.Router()

// 3. 注册n个路由
  /*
  1. 获取请求参数数据
  2. 处理数据
  3. 返回响应数据
   */
// 注册路由
router.post('/register', function (req, res) { // 处理请求, 返回响应
  // 1. 获取请求参数数据(name, pwd, type)
  const {name, pwd, type} = req.body
  // 2. 处理数据
  // 3. 返回响应数据
  // 2.1. 根据name查询数据库, 看是否已存在user
  UserModel.findOne({name}, function (err, user) {
    // 3.1. 如果存在, 返回一个提示响应数据: 此用户已存在
    if(user) {
      res.send({code: 1, msg: '此用户已存在'}) // code是数据是否是正常数据的标识
    } else {
      // 2.2. 如果不存在, 将提交的user保存到数据库
      new UserModel({name, pwd: md5(pwd), type}).save(function (err, user) {
        // 生成一个cookie(userid: user._id), 并交给浏览器保存
        res.cookie('userid', user._id)
        console.log('------')
        // 3.2. 保存成功, 返回成功的响应数据: user
        res.send({code: 0, data: {_id: user._id, name, type}})  // 返回的数据中不要携带pwd
      })
    }
  })
})
// 登陆路由
router.post('/login', function (req, res) {
  // 1. 获取请求参数数据(name, pwd)
  const {name, pwd} = req.body
  // 2. 处理数据: 根据name和pwd去数据库查询得到user
  UserModel.findOne({name, pwd: md5(pwd)}, filter, function (err, user) {
    // 3. 返回响应数据
    // 3.1. 如果user没有值, 返回一个错误的提示: 用户名或密码错误
    if(!user) {
      res.send({code: 1, msg: '用户名或密码错误'})
    } else {
      // 生成一个cookie(userid: user._id), 并交给浏览器保存
      res.cookie('userid', user._id)
      // 3.2. 如果user有值, 返回user
      res.send({code: 0, data: user}) // user中没有pwd
    }
  })
})


// 4. 向外暴露路由器
module.exports = router

// 5. 通过 app使用上路由器(server.js中编写)


/*
cookie:
1. 在哪生成: 服务器
2. 在哪保存: 浏览器
3. 如何使用: 浏览器请求服务器会自动携带对应的cookie
4. 在哪读cookie: 服务器处理请求时读取
 */
