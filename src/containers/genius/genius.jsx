import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getUserList} from '../../redux/actions'
import UserList from '../../components/user-list/user-list'

class Genius extends Component {

  componentDidMount () {
    // 异步获取boss的userlist
    this.props.getUserList('boss')
  }
  render() {
    return (
      <UserList userList={this.props.userList}/>
    )
  }
}

export default connect(
  state => ({userList: state.userList}),
  {getUserList}
)(Genius)