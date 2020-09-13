/* eslint-disable toplevel/no-toplevel-side-effect */
import express, { NextFunction, Request, Response } from 'express'
import { resolve } from 'path'
import { setupReactViews } from '..'
import { Props } from './views/my-view'

export const app = express()

setupReactViews(app, {
  viewsDirectory: resolve(__dirname, 'views'),
  prettify: true,
  transform: (html) => html.replace('<!-- CSS -->', 'h1{color:red}'),
})

app.get('/', (req: Request, res: Response, _next: NextFunction) => {
  const data: Props = { title: 'Test', lang: 'de' }
  res.render('my-view', data)
})

app.get('/with-locals', (req: Request, res: Response, _next: NextFunction) => {
  res.locals.title = 'from locals'
  res.render('my-view')
})
