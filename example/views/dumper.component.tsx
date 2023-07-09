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
      {/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </figure>
  )
}
