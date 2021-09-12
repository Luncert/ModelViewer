import React, { Component } from 'react';
import { names } from './util';
import { ipcRenderer } from 'electron';
import { Channels, WINDOW_STATE } from '../../common/Constants';
import anime from 'animejs'

const styles = require('./Header.css') as any
const iconStyles = require('./assets/icon/iconfont.css') as any

interface HeaderProps {
  title: string
  subTitle: string
}

interface State {
  windowState: number
}

export default class Header extends Component<HeaderProps, State> {

  private btnGroupRef: React.RefObject<HTMLDivElement>

  constructor(props: HeaderProps) {
    super(props)
    this.state = {
      windowState: this.fetchWindowState()
    }
    this.btnGroupRef = React.createRef()
  }

  private fetchWindowState() {
    return ipcRenderer.sendSync(Channels.FetchWindowState)
  }

  private onEnterBtn(elem: Element) {
    anime({
      targets: elem,
      backgroundColor: 'rgb(80, 80, 80)',
      easing: 'easeInOutSine',
      duration: 150
    })
  }

  private onLeaveBtn(elem: Element) {
    anime({
      targets: elem,
      backgroundColor: 'rgb(56, 56, 56)',
      easing: 'easeInOutSine',
      duration: 150
    })
  }

  render() {
    const { windowState } = this.state
    return (
      <div className={styles.root}>
        <div className={styles.textGroup}>
          <span className={styles.title}>{this.props.title}</span>
          <span className={styles.subTitle}>{this.props.subTitle}</span>
        </div>
        <div ref={this.btnGroupRef} className={styles.windowControlGroup}>
          <div className={names(styles.btn, styles.btnMinimize)}
            onClick={() => this.setState({windowState: ipcRenderer.sendSync(Channels.MinimizeWindow)})}
            onMouseEnter={() => this.onEnterBtn(this.btnGroupRef.current.children[0])}
            onMouseLeave={() => this.onLeaveBtn(this.btnGroupRef.current.children[0])}>
            <i className={names(iconStyles.iconfont, iconStyles.iconMinimize)}></i>
          </div>
          <div className={names(styles.btn, styles.btnMaximize)}
            onClick={() => {
              if (windowState == WINDOW_STATE.NORMAL) {
                  this.setState({windowState: ipcRenderer.sendSync(Channels.MaximizeWindow)})
              } else if (windowState == WINDOW_STATE.MAXIMIZED) {
                  this.setState({windowState: ipcRenderer.sendSync(Channels.UnmaximizeWindow)})
              }
            }}
            onMouseEnter={() => this.onEnterBtn(this.btnGroupRef.current.children[1])}
            onMouseLeave={() => this.onLeaveBtn(this.btnGroupRef.current.children[1])}>
            <i className={names(iconStyles.iconfont, iconStyles.iconMaximize)}></i>
          </div>
          <div className={names(styles.btn, styles.btnClose)}
            onClick={() => this.setState({windowState: ipcRenderer.sendSync(Channels.CloseWindow)})}
            onMouseEnter={() => this.onEnterBtn(this.btnGroupRef.current.children[2])}
            onMouseLeave={() => this.onLeaveBtn(this.btnGroupRef.current.children[2])}>
            <i className={names(iconStyles.iconfont, iconStyles.iconClose)}></i>
          </div>
        </div>
      </div>
    )
  }
}