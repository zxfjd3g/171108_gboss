import React, {Component} from 'react'
import jobImg from './job.png'
import './logo.less'

/*
简单的显示logo的组件
 */
export default class Logo extends Component {
  render () {
    return (
      <div className="logo-container">
        <img src={jobImg} alt="logo"/>
      </div>
    )
  }
}