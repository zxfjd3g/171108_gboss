/*
根据老的state和action来产生一个新的state返回
 */
import {combineReducers} from 'redux'

import {AUTH_SUCCESS, ERROR_MSG} from './action-types'
import {getRedirectPath} from '../utils'

const initUser = {
  name: '', // 用户名
  type: '', //用户类型
  msg: '', //错误提示信息
  redirectTo: '' // 需要自动转向的路径
}

// 管理user的reducer
function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:  // 成功  user
      const user = action.data
      return {...user, redirectTo:getRedirectPath(user.type, user.avatar)}
    case ERROR_MSG: //失败 msg
      return {...state, msg: action.data}   // ...的功能解包/打包
    default:
      return state
  }
}

/*function test (...args) { // 打包

}

test(1, 2, 3)*/


// 向外暴露的是合并后的reducer函数
export default combineReducers({ // 返回的依然是一个reducer函数
  user,
  // xxx
})  // state的结构: {user, xxx}