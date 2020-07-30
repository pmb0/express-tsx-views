/* eslint-disable toplevel/no-toplevel-side-effect */
import express, { NextFunction, Request, Response } from 'express'
import { resolve } from 'path'
import { setupReactViews } from '..'
import { Props } from './views/my-view'

export const app = express()

const extension = __filename.endsWith('.js') ? 'js' : 'tsx'

setupReactViews(app, {
  viewsDirectory: resolve(__dirname, 'views'),
  prettify: true,
})
// app.set('view engine', extension)
// app.engine(extension, reactViews({ prettify: true }))
// app.set('views', resolve(__dirname, 'views'))

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  const data: Props = { title: 'Test', lang: 'de' }
  res.render('my-view', data)
})

app.get('/with-locals', (req: Request, res: Response, next: NextFunction) => {
  res.locals.title = 'from locals'
  res.render('my-view')
})
