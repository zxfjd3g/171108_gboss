/*
入口JS
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'

import Login from './containers/login/login'
import Register from './containers/register/register'
import Dashboard from './containers/dashboard/dashboard'
import store from './redux/store'

import './assets/css/index.less'


//渲染标签到页面
ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route component={Dashboard}/> {/*默认路由组件*/}
      </Switch>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))

// 复制一行: ctrl + 向下
// 大小写切换: ctrl + shift + X