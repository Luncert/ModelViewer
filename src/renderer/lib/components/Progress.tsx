import React, { Component, CSSProperties } from 'react';

const styles = require('./Progress.css') as any

interface ProgressProps {
  /**
   * range: [0, 100]
   */
  value: number
  color?: string
  style?: CSSProperties
}

export default class Progress extends Component<ProgressProps> {

  render() {
    let value = this.props.value
    if (value < 0) {
      value = 0
    } else if (value > 100) {
      value = 100
    }

    return (
      <div className={styles.root} style={this.props.style}>
        <div className={styles.bar} style={{width: `calc(${this.props.value}% - 4.5em)`, backgroundColor: this.props.color}}></div>
        <div className={styles.value} style={{color: this.props.color}}>{this.props.value}</div>
      </div>
    )
  }
}