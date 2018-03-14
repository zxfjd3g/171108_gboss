/*
根据老的state和action来产生一个新的state返回
 */
import {combineReducers} from 'redux'

import {AUTH_SUCCESS, ERROR_MSG} from './action-types'

const initUser = {
  name: '', // 用户名
  type: '', //用户类型
}

// 管理user的reducer
function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return
    case ERROR_MSG:
      return
    default:
      return state
  }
}


// 向外暴露的是合并后的reducer函数
export default combineReducers({ // 返回的依然是一个reducer函数
  user
})