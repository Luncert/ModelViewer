import React, { Component, ReactElement } from 'react';
import { names } from './util';
import { ipcRenderer } from 'electron';
import { Channels, WINDOW_STATE } from '../../common/Constants';
import Button from './Button';

const styles = require('./Header.css') as any
const iconStyles = require('../assets/icon/iconfont.css') as any

interface HeaderProps {
  title: string
  element: string | HTMLElement | ReactElement
}

interface State {
  windowState: number
}

export default class Header extends Component<HeaderProps, State> {

  constructor(props: HeaderProps) {
    super(props)
    this.state = {
      windowState: this.fetchWindowState()
    }
  }

  private fetchWindowState() {
    return ipcRenderer.sendSync(Channels.FetchWindowState)
  }

  render() {
    const { windowState } = this.state
    return (
      <div className={styles.root}>
        <div className={styles.textGroup}>
          <div className={styles.title}>{this.props.title}</div>
          <div className={styles.element}>{this.props.element}</div>
          <div className={styles.grabArea}></div>
        </div>
        <div className={styles.windowControlGroup}>
          <Button className={styles.btnMinimize} style={{cursor: 'default'}}
            onClick={() => this.setState({windowState: ipcRenderer.sendSync(Channels.MinimizeWindow)})}>
            <i className={names(iconStyles.iconfont, iconStyles.iconMinimize)}></i>
          </Button>
          <Button className={styles.btnMaximize} style={{cursor: 'default'}}
            onClick={() => {
              if (windowState == WINDOW_STATE.NORMAL) {
                  this.setState({windowState: ipcRenderer.sendSync(Channels.MaximizeWindow)})
              } else if (windowState == WINDOW_STATE.MAXIMIZED) {
                  this.setState({windowState: ipcRenderer.sendSync(Channels.UnmaximizeWindow)})
              }
            }}>
            <i className={names(iconStyles.iconfont, iconStyles.iconMaximize)}></i>
          </Button>
          <Button className={styles.btnClose} style={{cursor: 'default'}}
            onClick={() => this.setState({windowState: ipcRenderer.sendSync(Channels.CloseWindow)})}>
            <i className={names(iconStyles.iconfont, iconStyles.iconClose)}></i>
          </Button>
        </div>
      </div>
    )
  }
}