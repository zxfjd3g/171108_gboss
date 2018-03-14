/*
n个能操作数据库集合数据的model
1. 连接数据库
  1.1. 引入mongoose
  1.2. 连接指定数据库(URL只有数据库是变化的)
  1.3. 获取连接对象
  1.4. 绑定连接完成的监听(用来提示连接成功)
2. 定义对应特定集合的Model
  2.1. 字义Schema(描述文档结构)
  2.2. 定义Model(与集合对应, 可以操作集合)
3. 向外暴露获取Model的方法
 */
// 1. 连接数据库
// 1.1. 引入mongoose
const mongoose = require('mongoose')
// 1.2. 连接指定数据库(URL只有数据库是变化的)
mongoose.connect('mongodb://localhost:27017/gboss')
// 1.3. 获取连接对象
const conn = mongoose.connection
// 1.4. 绑定连接完成的监听(用来提示连接成功)
conn.on('connected', function () {
  console.log('数据库连接成功')
})
// 2. 定义对应特定集合的Model
// 2.1. 字义Schema(描述文档结构)
const userSchema = mongoose.Schema({
  // 用户名
  'name': {type: String, required: true},
  // 密码
  'pwd': {type: String, required: true},
  // 类型
  'type': {'type': String, required: true},
  // 头像
  'avatar': {'type': String},
  // 个人简介或者职位简介
  'desc': {'type': String},
  // 职位名
  'title': {'type': String},
  // 如果你是boss 还有两个字段
  // 公司名称
  'company': {'type': String},
  // 工资
  'money': {'type': String}
})
// 2.2. 定义Model(与集合对应, 可以操作集合)
// const UserModel = mongoose.model('user', userSchema)  // 集合: users
mongoose.model('user', userSchema)  // 集合: users
// const UserModel = mongoose.model('user')  // 得到对应的model
// 3. 向外暴露获取Model的方法
module.exports = {
  getModel (name) {
    return mongoose.model(name)
  }
}

/*
import models from ''
const UserModel = models.getModel('user')
*/
