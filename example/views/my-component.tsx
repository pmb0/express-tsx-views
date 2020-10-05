import React, { Component, ReactElement } from 'react'

export interface Properties {
  myProp: string
}

export default class MyComponent extends Component<Properties> {
  render(): ReactElement {
    return <>Hello from MyComponent! Provided prop: {this.props.myProp}</>
  }
}
