
/*
对话聊天的路由组件
 */

import React, {Component} from 'react'
import {NavBar, List, InputItem} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg} from '../../redux/actions'

const Item = List.Item

class Chat extends Component {

  state = {
    content: ''
  }

  handleChange = (content) => {
    this.setState({content})
  }

  send = () => {
    const content = this.state.content.trim()
    if(content) {
      const from = this.props.user._id
      console.log('from', from)
      const to = this.props.match.params.userid
      // 发送消息
      this.props.sendMsg({from, to, content})
      // 清除输入数据
      this.setState({content: ''})
    }
  }
/*
两种请求参数?
1. param参数
  /xxx/yyy/:name/:pwd
  /xxx/yyy/tom/123 :  param参数: name=tom  | pwd=123
2. query参数:
  /xxx/yyy?name=tom&pwd=123: query参数name=tom | pwd=123
 */

  render() {

    // 找到所有当前登陆用户与目标用户的聊天列表
    const {user} = this.props
    const {users, chatMsgs} = this.props.chat
    if(!users[user._id]) { // 当没有数据时, 不做任何显示
      return null
    }

    const targetId = this.props.match.params.userid
    const meId = user._id
    const chat_id = [targetId, meId].sort().join('_')
    const msgs = chatMsgs.filter(msg => msg.chat_id===chat_id)

    // 确定聊天双方的头像
    const targetAvatar = users[targetId].avatar
    const targetIcon = targetAvatar ? require(`../../assets/imgs/${targetAvatar}.png`) : null
    const meIcon = require(`../../assets/imgs/${users[meId].avatar}.png`)

    return (
      <div id='chat-page'>
        <NavBar>{users[targetId].name}</NavBar>
        <List>
          {
            msgs.map(msg => {
              if(msg.to===meId) { // 发给我的
                return (
                  <Item
                    key={msg._id}
                    thumb={targetIcon}
                  >
                    {msg.content}
                  </Item>
                )
              } else { // 我发的
                return (
                  <Item
                    className='chat-me'
                    key={msg._id}
                    extra={<img src={meIcon}/>}
                  >
                    {msg.content}
                  </Item>
                )
              }
            })
          }

        </List>

        <div className='am-tab-bar'>
          <InputItem
            placeholder="请输入"
            extra={
              <span onClick={this.send}>发送</span>
            }
            value={this.state.content}
            onChange={val => {this.handleChange(val)}}
          />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {sendMsg}
)(Chat)