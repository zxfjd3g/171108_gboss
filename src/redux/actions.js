/*
包含n个同步/异步action creator函数
 */

import {reqRegister, reqLogin} from '../api'
import {ERROR_MSG, AUTH_SUCCESS} from "./action-types";

// 错误信息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})

// 请求成功的同步action
const authsuccess = (user) => ({type: AUTH_SUCCESS, data: user})


// 异步注册action
export const register = ({name, pwd, pwd2, type}) => {
  // 做前台验证, 如果失败, 返回一个失败的action
  if(!name || !pwd) {
    return errorMsg('用户名和密码必须输入')
  } else if(pwd!==pwd2) {
    return errorMsg('两次密码要一致!')
  }

  //如果成功了, 发异步的ajax请求
  return  dispatch => { // 返回一个函数是异步action
    reqRegister({name, pwd, type}).then(response => {
      const result = response.data  // {code: 0, data: user}  {code:1, msg: 'xxx'}
      // 如果成功了, 分发一个成功的action
      if(result.code===0) {
        dispatch(authsuccess(result.data))
      } else {// 如果失败了, 分发一个错误信息的action
        dispatch(errorMsg(result.msg))
      }
    })
  }
}

// 异步登陆action
export const login = ({name, pwd}) => {
  // 前台验证, 如果不通过, 返回错误信息的action
  if(!name || !pwd) {
    return errorMsg('用户名和密码必须输入')
  }

  return dispatch => {
    // 如果通过, 发异步ajax请求登陆
    reqLogin({name, pwd}).then(response => {
      const result = response.data
      // 如果成功了, 分发一个成功的action
      if(result.code===0) {
        dispatch(authsuccess(result.data))
      } else {
        // 如果失败了, 分发一个错误信息的action
        dispatch(errorMsg(result.msg))
      }
    })
  }

}