/*
使用mongoose操作mongodb的测试文件
1. 连接数据库
  1.1. 引入mongoose
  1.2. 连接指定数据库(URL只有数据库是变化的)
  1.3. 获取连接对象
  1.4. 绑定连接完成的监听(用来提示连接成功)
2. 得到对应特定集合的Model
  2.1. 字义Schema(描述文档结构)
  2.2. 定义Model(与集合对应, 可以操作集合)
3. 通过Model或其实例对集合数据进行CRUD操作
  3.1. 通过Model实例的save()添加数据
  3.2. 通过Model的find()/findOne()查询多个或一个数据
  3.3. 通过Model的findByIdAndUpdate()更新某个数据
  3.4. 通过Model的remove()删除匹配的数据
 */
// 1. 连接数据库
// 1.1. 引入mongoose
const mongoose = require('mongoose')
// 1.2. 连接指定数据库(URL只有数据库是变化的)
mongoose.connect('mongodb://localhost:27017/gboss_test')
// 1.3. 获取连接对象
const conn = mongoose.connection
// 1.4. 绑定连接完成的监听(用来提示连接成功)
conn.on('connected', function () {
  console.log('数据库连接成功')
})

// 2. 得到对应特定集合的Model
// 2.1. 字义Schema(描述文档结构)
const userSchema = mongoose.Schema({
  // 用户名
  'name': {type: String, 'required': true},
  // 密码
  'pwd': {type: String, 'required': true},
  // 类型
  'type': {'type': String, 'required': true},
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
const UserModel = mongoose.model('user', userSchema) // 集合名: users

// CRUD

// 3.1. 通过Model实例的save()添加数据
function testSave() {
  // user数据对象
  const user = {
    name: 'Jack22',
    pwd: '1234',
    type: 'genius',
    avatar: 'boy'
  }
  const userModel = new UserModel(user)
  // 保存到数据库
  userModel.save(function (err, user) {
    console.log('save', err, user)
  })
}

// testSave()


// 3.2. 通过Model的find()/findOne()查询多个或一个数据
function testFind() {
  // 查找多个
  UserModel.find(function (err, users) { // 如果有匹配返回的是一个[user, user..], 如果没有一个匹配的返回[]
    console.log('find() ', err, users)
  })
  // 查找一个
  UserModel.findOne({_id: '5aa7bce53a0c051ea4962a72'}, function (err, user) { // 如果有匹配返回的是一个user, 如果没有一个匹配的返回null
    console.log('findOne() ', err, user)
  })
}

// testFind()


// 3.3. 通过Model的findByIdAndUpdate()更新某个数据
function testUpdate() {
  UserModel.findByIdAndUpdate({_id: '5aa7bce53a0c051ea4962a72'}, {name: 'yyy'}, function (err, user) {
    console.log('findByIdAndUpdate()', err, user)
  })
}
// testUpdate()

// 3.4. 通过Model的remove()删除匹配的数据
function testDelete() {
  UserModel.remove({_id: '5aa7bce53a0c051ea4962a72'}, function (err, result) {
    console.log('remove()', err, result)
  })
}
testDelete()

