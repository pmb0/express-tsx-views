import React, { Component, ReactElement } from 'react'

export interface Props {
  myProp: string
}

export default class MyComponent extends Component<Props> {
  render(): ReactElement {
    return <>Hello from MyComponent! Provided prop: {this.props.myProp}</>
  }
}
