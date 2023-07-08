import { gql } from '@apollo/client/core/index.js'
import { useQuery } from '@apollo/client/react/hooks/index.js'
import React, { ReactElement } from 'react'
import MyComponent from './my-component.js'
import { MyLayout } from './my-layout.js'

export interface Film {
  id: string
  title: string
  releaseDate: string
}

export interface AllFilms {
  allFilms: {
    films: Film[]
  }
}

const MY_QUERY = gql`
  query AllFilms {
    allFilms {
      films {
        id
        title
        releaseDate
      }
    }
  }
`

export interface Props {
  title: string
  lang: string
}

export default function MyView(props: Props): ReactElement {
  const { data, error } = useQuery<AllFilms>(MY_QUERY)

  if (error) {
    throw error
  }

  return (
    <MyLayout lang={props.lang} title={props.title}>
      <h1>{props.title}</h1>
      <p>Some component:</p>
      <MyComponent myProp="foo"></MyComponent>

      <h2>Films:</h2>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      {data?.allFilms.films.map((film) => (
        <ul key={film.id}>
          {film.title} ({new Date(film.releaseDate).getFullYear()})
        </ul>
      ))}
    </MyLayout>
  )
}
