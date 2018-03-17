/*
选择头像的组件
 */
import React, {Component} from 'react'
import {List, Grid} from 'antd-mobile'
import {PropTypes} from 'prop-types'

export default class AvatarSelector extends Component {

  static propTypes = {
    setAvatar: PropTypes.func.isRequired
  }

  state = {
    icon: null
  }

  constructor(props) {
    super(props)
    this.avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',')
      .map(text => ({text, icon: require(`../../assets/imgs/${text}.png`)}))
    // [{text: 'boy', icon: 图片对象}]
  }

  selectAvatar = ({icon, text}) => {
    // 更新当前组件的状态
    this.setState({icon})
    // 更新父组件的状态
    this.props.setAvatar(text)
  }


  render () {

    // 计算头部显示
    const {icon} = this.state
    const gridHeader = icon ? <p>已选择头像: <img src={icon} alt="avatar"/></p> : '请选择头像'

    return (
      <List renderHeader={() => gridHeader}>
        <Grid data={this.avatarList}
              columnNum={5}
              onClick={this.selectAvatar}/>
      </List>
    )
  }
}