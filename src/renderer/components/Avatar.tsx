import React, { Component } from 'react';

const styles = require('./Avatar.css') as any

interface AvatarProps {
  src: string
}

export default class Avatar extends Component<AvatarProps> {

  render() {
    return (
      <img className={styles.root} src={this.props.src} />
    )
  }
}