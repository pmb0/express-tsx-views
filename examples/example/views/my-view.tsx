import React, { Component, ReactElement } from 'react'
import MyComponent from './my-component'
import { MyLayout } from './my-layout'

export interface Props {
  title: string
  lang: string
}

export default class MyView extends Component<Props> {
  render(): ReactElement {
    return (
      <MyLayout lang={this.props.lang} title={this.props.title}>
        <h1>{this.props.title}</h1>
        <p>Some component:</p>
        <MyComponent myProp="foo"></MyComponent>
      </MyLayout>
    )
  }
}
