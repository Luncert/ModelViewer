import React, { Component, CSSProperties } from 'react';

const styles = require('./Label.css') as any

interface LabelProps {
  style?: CSSProperties
}

export default class Label extends Component<LabelProps> {

  render() {
    return (
      <div className={styles.root} style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
}