import React, { Component, ReactElement } from 'react'
import { Dumper } from './dumper.component.js'

export interface Properties {
  myProp: string
}

export default class MyComponent extends Component<Properties> {
  render(): ReactElement {
    return (
      <>
        Hello from {MyComponent.name}! Provided prop:{' '}
        <Dumper data={this.props.myProp} />
      </>
    )
  }
}
