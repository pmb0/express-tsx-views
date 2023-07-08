/* eslint-disable toplevel/no-toplevel-side-effect */
import { InMemoryCache } from '@apollo/client/cache/index.js'
import { ApolloClient } from '@apollo/client/core/index.js'
import { createHttpLink } from '@apollo/client/link/http/index.js'
import { fetch } from 'cross-fetch'
import express, { NextFunction, Request, Response } from 'express'
import { resolve } from 'path'
import { ApolloRenderMiddleware } from '../src/apollo.js'
import { dirname } from '../src/import-meta-url.js'
import {
  PrettifyRenderMiddleware,
  addReactContext,
  setupReactViews,
} from '../src/index.js'
import { MyContext, MyContext2 } from './my-context.js'
import { Props } from './views/my-view.js'

export const app = express()

const apollo = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    fetch,
  }),
  cache: new InMemoryCache(),
})

setupReactViews(app, {
  viewsDirectory: resolve(dirname, 'views'),
  middlewares: [
    new ApolloRenderMiddleware(apollo),
    new PrettifyRenderMiddleware(),
  ],
  transform: async (html) => {
    // eslint-disable-next-line no-magic-numbers, @typescript-eslint/no-magic-numbers
    await new Promise((resolve) => setTimeout(resolve, 100))
    return html.replace('<!-- CSS -->', 'h1{color:red}')
  },
})

// Set react context globally for all routes
app.use((req: Request, res: Response, next: NextFunction) => {
  addReactContext(res, MyContext, {
    id: 1,
    name: 'test',
  })
  next()
})

app.get('/', (request: Request, res: Response) => {
  const data: Props = { title: 'Test', lang: 'de' }

  addReactContext(res, MyContext2, { someProperty: 'mausi' })

  res.render('my-view', data)
})

app.get(
  '/with-locals',
  (request: Request, res: Response<string, Partial<Props>>) => {
    res.locals.title = 'from locals'
    res.render('my-view')
  },
)

app.get('/gql', (request: Request, res: Response) => {
  const data: Props = { title: 'Test', lang: 'de' }
  res.render('my-gql-view', data)
})
