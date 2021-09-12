import React, { Component, CSSProperties } from 'react';
import { names } from '../util';

const styles = require('./Divider.css') as any

interface DividerProps {
  vertical?: boolean
  style?: CSSProperties
}

export default class Divider extends Component<DividerProps> {

  render() {
    return (
      <div className={names(styles.root, this.props.vertical ? styles.vertical : '')}
        style={this.props.style}></div>
    )
  }
}