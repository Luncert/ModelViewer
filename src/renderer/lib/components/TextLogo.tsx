import React, { Component, CSSProperties } from 'react';

const styles = require('./TextLogo.css') as any

interface TextLogProps {
  logo: string
  color?: string
  style?: CSSProperties
}

export default class TextLogo extends Component<TextLogProps> {

  private randomColor(): string {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }

  render() {
    let getColor: () => string
    if (this.props.color == 'random-line') {
      getColor = this.randomColor
    } else {
      getColor = () => this.props.color || 'white'
    }

    return (
      <div className={styles.root} style={this.props.style}>
        {
          this.props.logo.split('\n').map((line, idx) => (
            <span key={idx} style={{color: getColor()}}>{line}</span>
          ))
        }
      </div>
    )
  }
}