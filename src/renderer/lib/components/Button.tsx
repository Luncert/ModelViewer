import React, { Component, MouseEventHandler } from 'react';

const styles = require('./Button.css') as any

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default class Button extends Component<ButtonProps> {

  render() {
    return (
      <div className={styles.root} onClick={this.props.onClick}>
        {this.props.children}
      </div>
    )
  }
}