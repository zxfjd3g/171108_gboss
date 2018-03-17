/*
根据老的state和action来产生一个新的state返回
 */
import {combineReducers} from 'redux'

import {
  ERROR_MSG,
  AUTH_SUCCESS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST
} from "./action-types";
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
    case RECEIVE_USER:
      return action.data
    case RESET_USER:
      return {...initUser, msg: action.data}
    default:
      return state
  }
}

const initUserList = []

// 管理用户列表的reducer
function userList(state=initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data
    default:
      return state
  }
}


// 向外暴露的是合并后的reducer函数
export default combineReducers({ // 返回的依然是一个reducer函数
  user,
  userList
})  // state的结构: {user, userList}