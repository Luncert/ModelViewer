import React, { Component, CSSProperties } from 'react';

const styles = require('./List.css') as any

interface ItemProps {
  style?: CSSProperties
}

interface ListProps {
  style?: CSSProperties
}

export class Item extends Component<ItemProps> {

  render() {
    return (
      <div className={styles.itemRoot} style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
}

export default class List extends Component<ListProps> {

  static Item = Item

  render() {
    return (
      <div className={styles.root} style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
}