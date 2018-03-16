/*
应用主面板路由组件
 */
import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import cookies from 'browser-cookies' // get(), set()

import BossInfo from '../boss-info/boss-info'
import GeniusInfo from '../genius-info/genius-info'

export default class Dashboard extends React.Component {

  render () {
    // 判断用户是否已登陆(过)(cookie中userid是否有值)
    const userid = cookies.get('userid')
    if(!userid) { // 如果没值, 自动跳转到登陆界面
      return <Redirect to='/login'/>
    }


    return (
      <div>
        dashboard
        <Switch>
          <Route path='/bossinfo' component={BossInfo}></Route>
          <Route path='/geniusinfo' component={GeniusInfo}></Route>
        </Switch>
      </div>
    )
  }
}