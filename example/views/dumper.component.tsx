/* eslint-disable no-magic-numbers */
import React, { ReactElement } from 'react'

export interface DumperProps {
  data: unknown
  caption?: string
}

export function Dumper({ caption, data }: DumperProps): ReactElement {
  return (
    <figure>
      {caption && <figcaption>{caption}:</figcaption>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </figure>
  )
}
