/*
用户列表的UI组件
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

const Header = Card.Header
const Body = Card.Body

class UserList extends React.Component {

  static propsTypes = {
    userList: PropTypes.array.isRequired
  }

  handleClick = (userid) => {
    // 跳转到chat路由
    this.props.history.push(`/chat/${userid}`)
  }


  render() {
    return (
      <WingBlank style={{marginTop: 50, marginBottom: 50}}>
        {
          this.props.userList.map(user => (
            <div key={user._id}>
              <WhiteSpace/>
              <Card onClick={() => {this.handleClick(user._id)}}>
                <Header
                  title={user.name}
                  thumb={user.avatar ? require(`../../assets/imgs/${user.avatar}.png`) : null}
                  extra={<span>{user.title}</span>}
                />
                <Body>
                {user.company ? <div>公司: {user.company}</div> : null}
                <div>描述: {user.desc}</div>
                {user.money ? <div>薪资: {user.money}</div> : null}
                </Body>
              </Card>
            </div>
          ))
        }


      </WingBlank>
    )
  }
}

export default withRouter(UserList)