import React, { ReactElement, ReactNode } from 'react'

export type Language = string

export interface LayoutProps {
  lang: Language
  title: string
  children: ReactNode
}

export const MyLayout = ({
  children,
  lang,
  title,
}: LayoutProps): ReactElement => {
  return (
    <html lang={lang}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: '<!-- CSS -->' }}></style>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
