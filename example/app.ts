/* eslint-disable toplevel/no-toplevel-side-effect */
import express, { NextFunction, Request, Response } from 'express'
import { resolve } from 'path'
import { setupReactViews } from '..'
import { Props } from './views/my-view'

export const app = express()

setupReactViews(app, {
  viewsDirectory: resolve(__dirname, 'views'),
  prettify: true,
})

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  const data: Props = { title: 'Test', lang: 'de' }
  res.render('my-view', data)
})

app.get('/with-locals', (req: Request, res: Response, next: NextFunction) => {
  res.locals.title = 'from locals'
  res.render('my-view')
})
