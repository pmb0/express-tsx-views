import prettier from 'prettier'
import React from 'react'
import * as ReactDOM from 'react-dom/server'

export interface ReactViewsOptions {
  doctype?: string
  prettify?: boolean
  viewsDirectory: string
}

export interface ExpressLikeApp {
  set(setting: string, val: any): this
  engine(
    ext: string,
    fn: (
      path: string,
      options: object,
      callback: (e: any, rendered?: string) => void
    ) => void
  ): this
}

export function setupReactViews(
  app: ExpressLikeApp,
  options: ReactViewsOptions
) {
  if (!options.viewsDirectory) {
    throw new Error('viewsDirectory missing')
  }

  const extension = __filename.endsWith('.js') ? 'js' : 'tsx'

  app.set('view engine', extension)
  app.engine(extension, reactViews(options))
  app.set('views', options.viewsDirectory)
}

export function reactViews(reactViewOptions: ReactViewsOptions) {
  return async function renderFile(
    filename: string,
    options: { [name: string]: any },
    next: any
  ): Promise<void> {
    const { settings, _locals, cache, ...vars } = options

    try {
      const Component = (await import(filename)).default

      const context = React.createContext({})

      let html = ReactDOM.renderToStaticMarkup(
        React.createElement(
          context.Provider,
          { value: { ...vars, ...settings, ..._locals } },
          React.createElement(Component, vars)
        )
      )

      if (reactViewOptions.prettify ?? false) {
        html = prettier.format(html, {
          parser: 'html',
        })
      }

      const doctype = reactViewOptions.doctype ?? '<!DOCTYPE html>\n'
      next(null, doctype + html)
    } catch (error) {
      next(error)
    }
  }
}
