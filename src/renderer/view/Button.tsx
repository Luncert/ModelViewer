
import React, { Component, CSSProperties } from 'react';
import anime from 'animejs'
import { names } from './util';

const styles = require('./Button.css') as any

interface ButtonProps {
  fixSize?: boolean
  onHover?: string
  className?: string
  onClick?: () => void
  style?: CSSProperties | undefined
}

export default class Button extends Component<ButtonProps> {

  private btnRef: React.RefObject<HTMLDivElement>

  constructor(props: any) {
    super(props)
    this.btnRef = React.createRef()
  }

  private onEnterBtn(elem: Element) {
    anime({
      targets: elem,
      backgroundColor: this.props.onHover || 'rgb(80, 80, 80)',
      easing: 'easeInOutSine',
      duration: 150
    })
  }

  private onLeaveBtn(elem: Element) {
    anime({
      targets: elem,
      backgroundColor: this.props.style && (this.props.style.background || this.props.style.backgroundColor) || 'rgb(56, 56, 56)',
      easing: 'easeInOutSine',
      duration: 150
    })
  }

  render() {
    let style: any = {}
    if (this.props.fixSize == undefined || this.props.fixSize) {
      style = {
        width: '30px',
        height: '30px'
      }
    }
    if (this.props.style) {
      Object.assign(style, this.props.style)
    }
    return (
      <div ref={this.btnRef}
        className={names(styles.btn, this.props.className)}
        style={style}
        onMouseEnter={() => this.onEnterBtn(this.btnRef.current)}
        onMouseLeave={() => this.onLeaveBtn(this.btnRef.current)}
        onClick={this.props.onClick}>
          {this.props.children}
      </div>
    )
  }
}