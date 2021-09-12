import React, { Component, CSSProperties } from 'react';
import { names } from '../util';
import Divider from './Divider';

const styles = require('./Modal.css') as any

interface HeaderProps {
  center?: boolean
  style?: CSSProperties
}

export class Header extends Component<HeaderProps> {

  render() {
    return (
      <div className={styles.header} style={this.props.style}>
        <div className={names(styles.headerContent, this.props.center ? styles.center : '')}>
          {this.props.children}
        </div>
        <Divider />
      </div>
    )
  }
}

export class Content extends Component {

}

interface ActionsProps {
  style?: CSSProperties
}

export class Actions extends Component<ActionsProps> {

  render() {
    return (
      <div className={styles.actions} style={this.props.style}>
        <Divider />
        <div className={styles.actionsContent}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default class Modal extends Component {
  static Header = Header
  static Content = Content
  static Actions = Actions

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.wrapper}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
