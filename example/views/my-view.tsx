import React, { ReactElement, useContext } from 'react'
import { MyContext, MyContext2 } from '../my-context'
import { Dumper } from './dumper.component'
import MyComponent from './my-component'
import { MyLayout } from './my-layout'

export interface Props {
  title: string
  lang: string
}

export default function MyView(props: Props): ReactElement {
  const context1 = useContext(MyContext)
  const context2 = useContext(MyContext2)

  return (
    <MyLayout lang={props.lang} title={props.title}>
      <h1>{props.title}</h1>
      <p>Some component:</p>

      <MyComponent myProp="foo"></MyComponent>
      <hr />

      <Dumper caption="props" data={props} />
      <hr />
      <Dumper caption="context1" data={context1} />
      <hr />
      <Dumper caption="context2" data={context2} />
    </MyLayout>
  )
}
