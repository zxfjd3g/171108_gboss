/*
登陆路由组件
 */
import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar, WingBlank, List, InputItem, WhiteSpace, Button} from 'antd-mobile'

import Logo from '../../components/logo/logo'
import {login} from '../../redux/actions'

class Login extends React.Component {

  // 给当前组件对象指定state属性(初始值)
  state = {
    name: '', // 用户名
    pwd: '',  // 密码
  }

  // 更新指定属性名的状态
  handleChange(name, val) { // 属性名为name的值
    this.setState({
      [name]: val   // name是一个变量
    })
  } // handleChange('pwd', '345')

  // 切换到注册
  goRegister = () => {
    this.props.history.replace('/register')
  }

  // 处理登陆
  handleLogin = () => {
    this.props.login(this.state)
  }

  render () {
    const {user} = this.props
    // 检查是否需要自动跳转路由
    if(user.redirectTo) {
      return <Redirect to={user.redirectTo}/>
    }

    return (
      <div>
        <NavBar>硅 谷 直 聘</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            {user.msg ? <p className='error-msg'>{user.msg}</p> : ''}
            <InputItem onChange={(val) => {this.handleChange('name', val)}}>用户名:</InputItem>
            <WhiteSpace/>
            <InputItem type="password" onChange={(val) => {this.handleChange('pwd', val)}}>密码:</InputItem>
            <WhiteSpace/>
            <Button type="primary" onClick={this.handleLogin}>登陆</Button>
            <Button onClick={this.goRegister}>还没有帐户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {login}
)(Login)
