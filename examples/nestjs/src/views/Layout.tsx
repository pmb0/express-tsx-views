import React, { ReactElement } from "react";

export type Language = string;

export interface LayoutProperties {
  lang: Language;
  title: string;
}

export class Layout extends React.Component<LayoutProperties> {
  render(): ReactElement {
    return (
      <html lang={this.props.lang}>
        <head>
          <style dangerouslySetInnerHTML={{ __html: '<!-- CSS -->' }}></style>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>{this.props.title}</title>
        </head>
        <body>{this.props.children}</body>
      </html>
    );
  }
}

export default Layout;
