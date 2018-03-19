/*
包含n个与后台接口对应的请求函数的模块
函数返回值为promise对象
 */
import ajax from './ajax'

// 请求注册
export const reqRegister = (user) => ajax('/api/register', user, 'POST')
// 请求登陆
export const reqLogin = (user) => ajax('/api/login', user, 'POST')

// 请求更新用户
export const reqUpdateUser = (user) => ajax('/api/update', user, 'POST')

// 获取用户
export const reqUser = () => ajax('/api/user')

// 根据type获取用户列表
export const reqUserList = (type) => ajax('/api/userlist', {type})

// 获取当前用户相关的所有聊天的列表
export const reqMsgList = () => ajax('/api/msglist')

// 更新读取的聊天消息
export const reqReadMsg = (from) => ajax('/api/readmsg', {from}, 'POST')

// 向下移动 alt + 向下
