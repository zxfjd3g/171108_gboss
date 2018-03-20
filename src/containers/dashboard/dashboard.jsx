/*
应用主面板路由组件
 */
import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import cookies from 'browser-cookies' // get(), set()
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'

import BossInfo from '../boss-info/boss-info'
import GeniusInfo from '../genius-info/genius-info'
import Genius from '../genius/genius'
import Boss from '../boss/boss'
import Msg from '../msg/msg'
import User from '../user/user'
import Chat from '../chat/chat'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'

import {getUser} from '../../redux/actions'
import {getRedirectPath} from '../../utils'

class Dashboard extends React.Component {
// 组件类和组件对象
  // 给组件对象添加属性
  navList = [
    {
      path: '/boss', // 路由路径
      component: Boss,
      title: '牛人列表',
      icon: 'boss',
      text: '牛人',
    },
    {
      path: '/genius', // 路由路径
      component: Genius,
      title: 'BOSS列表',
      icon: 'job',
      text: 'BOSS',
    },
    {
      path: '/msg', // 路由路径
      component: Msg,
      title: '消息列表',
      icon: 'msg',
      text: '消息',
    },
    {
      path: '/user', // 路由路径
      component: User,
      title: '个人中心',
      icon: 'user',
      text: '我',
    }
  ]

  componentDidMount () {
    // cookie中有userid
    // redux中的user是空对象
    const userid = cookies.get('userid')
    const {user} = this.props
    if(userid && !user._id) {
      this.props.getUser()  // 获取user并保存到redux中
    }
  }


  render () {
    // 得到当前请求的path
    const pathname = this.props.location.pathname
    // 判断用户是否已登陆(过)(cookie中userid是否有值)
    const userid = cookies.get('userid')
    if(!userid) { // 如果没值, 自动跳转到登陆界面
      return <Redirect to='/login'/>
    }
    // cookie中有userid
    // redux中的user是否有数据
    const {user} = this.props
    if(!user._id) {
      return null  // 不做任何显示
    } else {
      // 请求根路径时, 自动 跳转到对应的用户主界面
      if(pathname==='/') {
        const path = getRedirectPath(user.type, user.avatar)
        return <Redirect to={path}/>
      }

      // 指定哪个nav应该被隐藏
      if(user.type==='boss') {
        this.navList[1].hide = true
      } else {
        this.navList[0].hide = true
      }
    }

    // 得到当前的nav
    const currentNav = this.navList.find(nav => nav.path===pathname)

    return (
      <div>
        {currentNav? <NavBar className='stick-top'>{currentNav.title}</NavBar> : null}
        <Switch>
          <Route path='/bossinfo' component={BossInfo}></Route>
          <Route path='/geniusinfo' component={GeniusInfo}></Route>

          <Route path='/genius' component={Genius}></Route>
          <Route path='/boss' component={Boss}></Route>
          <Route path='/msg' component={Msg}></Route>
          <Route path='/user' component={User}></Route>
          <Route path='/chat/:userid' component={Chat}></Route>
          <Route component={NotFound}></Route>
        </Switch>

        {currentNav?  <NavFooter unReadCount={this.props.unReadCount} navList={this.navList}/>: null}
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, unReadCount: state.chat.unReadCount}),
  {getUser}
)(Dashboard)