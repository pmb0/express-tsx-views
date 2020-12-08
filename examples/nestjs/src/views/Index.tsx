import React, { ReactElement } from "react";

import { ExampleComponent } from "./Component";
import { Layout } from "./Layout";

export interface IndexProps {
  title: string;
  lang: string;
}

export default class Index extends React.Component<IndexProps> {
  render(): ReactElement {
    return (
      <Layout lang={this.props.lang} title={this.props.title}>
        <h1>{this.props.title}</h1>
        <p>Some component:</p>
        <ExampleComponent myProp="foo" />
      </Layout>
    );
  }
}
