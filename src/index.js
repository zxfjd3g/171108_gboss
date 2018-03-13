/*
入口JS
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Button} from 'antd-mobile'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Login from './containers/login/login'
import Register from './containers/register/register'
import Dashboard from './containers/dashboard/dashboard'


//渲染标签到页面
ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
      <Route component={Dashboard}/> {/*默认路由组件*/}
    </Switch>
  </BrowserRouter>
), document.getElementById('root'))

// 复制一行: ctrl + 向下
// 大小写切换: ctrl + shift + X