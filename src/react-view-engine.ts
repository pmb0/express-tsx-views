import prettier from 'prettier'
import React from 'react'
import * as ReactDOM from 'react-dom/server'
import {
  EngineCallbackParameters,
  ExpressLikeApp,
  ReactViewsOptions,
} from './react-view-engine.interface'

export function isTranspiled(): boolean {
  return require.main?.filename?.endsWith('.js') ?? true
}

export function setupReactViews(
  app: ExpressLikeApp,
  options: ReactViewsOptions,
): void {
  if (!options.viewsDirectory) {
    throw new Error('viewsDirectory missing')
  }

  const extension = isTranspiled() ? 'js' : 'tsx'

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.engine(extension, reactViews(options))
  app.set('view engine', extension)
  app.set('views', options.viewsDirectory)
}

export function reactViews(reactViewOptions: ReactViewsOptions) {
  // eslint-disable-next-line complexity, sonarjs/cognitive-complexity
  return async function renderFile(
    ...[filename, options, next]: EngineCallbackParameters
  ): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { settings, _locals, cache, ...vars } = options as {
      [name: string]: { [n: string]: string }
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const Component = (await import(filename)).default

      if (!Component) {
        throw new Error(`Module ${filename} does not have an default export`)
      }

      const context = React.createContext({})

      let html = ReactDOM.renderToStaticMarkup(
        React.createElement(
          context.Provider,
          { value: { ...vars, ...settings, ..._locals } },
          React.createElement(Component, vars),
        ),
      )

      if (reactViewOptions.prettify ?? false) {
        html = prettier.format(html, {
          parser: 'html',
        })
      }

      const doctype = reactViewOptions.doctype ?? '<!DOCTYPE html>\n'
      const transform = reactViewOptions.transform || ((html) => html)

      next(null, await transform(doctype + html))
    } catch (error) {
      next(error)
    }
  }
}
