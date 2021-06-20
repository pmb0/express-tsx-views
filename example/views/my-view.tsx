import React, { ReactElement } from 'react'
import MyComponent from './my-component'
import { MyLayout } from './my-layout'

export interface Props {
  title: string
  lang: string
}

export default function MyView(props: Props): ReactElement {
  return (
    <MyLayout lang={props.lang} title={props.title}>
      <h1>{props.title}</h1>
      <p>Some component:</p>
      <MyComponent myProp="foo"></MyComponent>
    </MyLayout>
  )
}
