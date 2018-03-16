/*
包含n个同步/异步action creator函数
 */

import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser
} from '../api'
import {
  ERROR_MSG,
  AUTH_SUCCESS,
  RECEIVE_USER,
  RESET_USER
} from "./action-types";

// 错误信息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})

// 请求成功的同步action
const authsuccess = (user) => ({type: AUTH_SUCCESS, data: user})

// 接收用户的同步action
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
// 重置用户的同步action
const resetUser = (msg) => ({type: RESET_USER, data: msg})


// 异步注册action
export const register = ({name, pwd, pwd2, type}) => {
  // 做前台验证, 如果失败, 返回一个失败的action
  if(!name || !pwd) {
    return errorMsg('用户名和密码必须输入')
  } else if(pwd!==pwd2) {
    return errorMsg('两次密码要一致!')
  }

  //如果成功了, 发异步的ajax请求
  return  async dispatch => { // 返回一个函数是异步action
    /*reqRegister({name, pwd, type}).then(response => {
      const result = response.data  // {code: 0, data: user}  {code:1, msg: 'xxx'}
      // 如果成功了, 分发一个成功的action
      if(result.code===0) {
        dispatch(authsuccess(result.data))
      } else {// 如果失败了, 分发一个错误信息的action
        dispatch(errorMsg(result.msg))
      }
    })*/
    // 使用await: 通过调用返回promise的函数获取异步的结果, 函数调用的左侧
    const response = await reqRegister({name, pwd, type})
    const result = response.data  // {code: 0, data: user}  {code:1, msg: 'xxx'}
    // 如果成功了, 分发一个成功的action
    if(result.code===0) {
      dispatch(authsuccess(result.data))
    } else {// 如果失败了, 分发一个错误信息的action
      dispatch(errorMsg(result.msg))
    }
  }
}

// 异步登陆action
export const login = ({name, pwd}) => {
  // 前台验证, 如果不通过, 返回错误信息的action
  if(!name || !pwd) {
    return errorMsg('用户名和密码必须输入')
  }

  return async dispatch => {
    const response = await reqLogin({name, pwd})
    const result = response.data
    // 如果成功了, 分发一个成功的action
    if(result.code===0) {
      dispatch(authsuccess(result.data))
    } else {
      // 如果失败了, 分发一个错误信息的action
      dispatch(errorMsg(result.msg))
    }
  }
}

/*
异步更新用户的action
 */
export const updateUser = (user) => {
  debugger
  return async dispatch => {
    const response = await reqUpdateUser(user)
    const result = response.data
    // 如果成功了, 分发一个接收用户的action
    if(result.code===0) {
      dispatch(receiveUser(result.data))
    } else {
      // 如果失败了, 分发一个重置用户的action
      dispatch(resetUser(result.msg))
    }
  }
}

/*
异步获取用户的action
 */
export const getUser = () => {
  return async dispatch => {
    const response = await reqUser()
    const result = response.data
    if(result.code===0) {
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}