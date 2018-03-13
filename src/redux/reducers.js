/*
根据老的state和action来产生一个新的state返回
 */
import {combineReducers} from 'redux'

function xxx(state = 0, action) {

  return state
}

function yyy(state = {}, action) {

  return state
}

// 向外暴露的是合并后的reducer函数
export default combineReducers({ // 返回的依然是一个reducer函数
  xxx,
  yyy
})