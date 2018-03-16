/*
应用主面板路由组件
 */
import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import cookies from 'browser-cookies' // get(), set()
import {connect} from 'react-redux'

import BossInfo from '../boss-info/boss-info'
import GeniusInfo from '../genius-info/genius-info'
import Genius from '../genius/genius'
import Boss from '../boss/boss'
import Msg from '../msg/msg'
import User from '../user/user'
import NotFound from '../not-found/not-found'

import {getUser} from '../../redux/actions'
import {getRedirectPath} from '../../utils'

class Dashboard extends React.Component {


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
    // 判断用户是否已登陆(过)(cookie中userid是否有值)
    const userid = cookies.get('userid')
    if(!userid) { // 如果没值, 自动跳转到登陆界面
      return <Redirect to='/login'/>
    }
    // cookie中有userid
    // redux中的user是否有数据
    const {user} = this.props
    if(!user._id) {
      return null
    } else {
      // 请求根路径时, 自动 跳转到对应的用户主界面
      const pathname = this.props.location.pathname
      if(pathname==='/') {
        const path = getRedirectPath(user.type, user.avatar)
        return <Redirect to={path}/>
      }
    }

    return (
      <div>
        <p>{this.props.user.type}</p>
        <Switch>
          <Route path='/bossinfo' component={BossInfo}></Route>
          <Route path='/geniusinfo' component={GeniusInfo}></Route>
          <Route path='/genius' component={Genius}></Route>
          <Route path='/boss' component={Boss}></Route>
          <Route path='/msg' component={Msg}></Route>
          <Route path='/user' component={User}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {getUser}
)(Dashboard)