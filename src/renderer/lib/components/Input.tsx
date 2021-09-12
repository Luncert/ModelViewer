import React, { Component, CSSProperties } from 'react';

const styles = require('./Input.css') as any

interface InputProps {
  style?: CSSProperties
}

export default class Input extends Component<InputProps> {

  render() {
    return (
      <input className={styles.root} spellCheck={false} style={this.props.style} />
    )
  }
}