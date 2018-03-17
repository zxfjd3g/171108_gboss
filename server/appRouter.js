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
        res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7}) // 持久化cookie, 浏览器会保存在本地文件
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
      res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
      // 3.2. 如果user有值, 返回user
      res.send({code: 0, data: user}) // user中没有pwd
    }
  })
})

// 更新用户路由
router.post('/update', function (req, res) {
  // 得到请求cookie的userid
  const userid = req.cookies.userid
  if(!userid) {// 如果没有, 说明没有登陆, 直接返回提示
    return res.send({code: 1, msg: '请先登陆'})
  }

  // 更新数据库中对应的数据
  UserModel.findByIdAndUpdate({_id: userid}, req.body, function (err, user) {// user是数据库中原来的数据
    if(!user) { // 更新失败
      // 删除浏览cookie中的userid
      res.clearCookie('userid')
      // 返回提示
      return res.send({code: 1, msg: '请先登陆'})
    } else { // 更新成功
      const {_id, name, type} = user
      // node端...不可用
      // const data = {...req.body, _id, name, type}
      // 合并用户信息
      const data = Object.assign(req.body, {_id, name, type})
      // assign(obj1, obj2, obj3,...) // 将多个指定的对象进行合并, 返回一个合并后的对象
      res.send({code: 0, data})
    }
  })

})

// 根据cookie获取对应的user
router.get('/user', function (req, res) {
  // 取出cookie中的userid
  const userid = req.cookies.userid
  if(!userid) {
    return res.send({code: 1, msg: '请先登陆'})
  }

  // 查询对应的user
  UserModel.findOne({_id: userid}, filter, function (err, user) {
    if(!user) {
      // 清除浏览器保存userid的cookie
      res.clearCookie('userid')
      return res.send({code: 1, msg: '请先登陆'})
    } else {
      return res.send({code: 0, data: user})
    }
  })
})


// 根据type获取用户列表
router.get('/userlist', function (req, res) {
  const type = req.query.type

  UserModel.find({type}, filter, function (err, users) {
    res.send({code: 0, data: users})
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
