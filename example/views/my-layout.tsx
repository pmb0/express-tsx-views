import React, { Component, ReactElement } from 'react'

export type Language = string

export interface LayoutProps {
  lang: Language
  title: string
}

export class MyLayout extends Component<LayoutProps> {
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
    )
  }
}
