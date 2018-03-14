/*
注册路由组件
 */
import React from 'react'
import {connect} from 'react-redux'
import {NavBar, WingBlank, List, InputItem, WhiteSpace, Radio, Button} from 'antd-mobile'

import Logo from '../../components/logo/logo'
import {register} from '../../redux/actions'

const RadioItem = Radio.RadioItem

class Register extends React.Component {

  /*constructor(props) {
    super(props)
    this.state = {
      name: '',
      pwd: '',
      pwd2: '',
      type: 'boss'
    }
  }*/
  // 给当前组件对象指定state属性(初始值)
  state = {
    name: '', // 用户名
    pwd: '',
    pwd2: '',
    type: 'boss' // 用户类型
  }

  // 更新指定属性名的状态
  handleChange(name, val) { // 属性名为name的值
    this.setState({
      [name]: val   // name是一个变量
    })
  } // handleChange('pwd', '345')

  // 切换到login
  goLogin = () => {
    this.props.history.replace('/login')
  }
  
  // 处理注册
  handleRegister = () => {
    // 触发redux中register action调用
    this.props.register(this.state)
  }

  render () {

    return (
      <div>
        <NavBar>硅 谷 直 聘</NavBar>
        <Logo/>

        <WingBlank>
          <List>
            <InputItem onChange={(val) => {this.handleChange('name', val)}}>用户名:</InputItem>
            <WhiteSpace/>
            <InputItem type="password" onChange={(val) => {this.handleChange('pwd', val)}}>密码:</InputItem>
            <WhiteSpace/>
            <InputItem type="password" onChange={(val) => {this.handleChange('pwd2', val)}}>确认密码:</InputItem>
            <WhiteSpace/>
            <RadioItem checked={this.state.type==='genius'}
                       onClick={() => {this.handleChange('type', 'genius')}}>牛人</RadioItem>
            <RadioItem checked={this.state.type==='boss'}
                       onClick={() => {this.handleChange('type', 'boss')}}>BOSS</RadioItem>
            <Button type="primary" onClick={this.handleRegister}>注册</Button>
            <Button onClick={this.goLogin}>已有帐户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),  // 组件的props多了一个属性: user
  {register} // 组件的props多了一个属性: register函数
)(Register)

/*
export default connect(
  state => ({}),
  {}
)(组件)
 */