/* eslint-disable toplevel/no-toplevel-side-effect */
import express, { NextFunction, Request, Response } from 'express'
import { resolve } from 'path'
import { setupReactViews } from '..'
import { Props as Properties } from './views/my-view'

export const app = express()

setupReactViews(app, {
  viewsDirectory: resolve(__dirname, 'views'),
  prettify: true,
  transform: async (html) => {
    // eslint-disable-next-line no-magic-numbers
    await new Promise((resolve) => setTimeout(resolve, 100))
    return html.replace('<!-- CSS -->', 'h1{color:red}')
  },
})

app.get('/', (request: Request, res: Response, _next: NextFunction) => {
  const data: Properties = { title: 'Test', lang: 'de' }
  res.render('my-view', data)
})

app.get(
  '/with-locals',
  (request: Request, res: Response, _next: NextFunction) => {
    res.locals.title = 'from locals'
    res.render('my-view')
  },
)
