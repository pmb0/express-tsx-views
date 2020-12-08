import React, { ReactElement } from "react";

export interface Properties {
  myProp: string;
}

export class ExampleComponent extends React.Component<Properties> {
  render(): ReactElement {
    return <>Hello from MyComponent! Provided prop: {this.props.myProp}</>;
  }
}

export default ExampleComponent;
