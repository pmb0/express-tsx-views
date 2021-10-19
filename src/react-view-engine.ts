import { Application, Response } from 'express'
import { Context } from 'react'
import {
  CreateReactContextRenderMiddleware,
  DefaultTsxRenderMiddleware,
  TsxRenderContext,
} from './handler'
import { PrettifyRenderMiddleware } from './handler/middleware/prettify-render.middleware'
import {
  EngineCallbackParameters,
  ExpressRenderOptions,
  ReactViewsContext,
  ReactViewsOptions,
} from './react-view-engine.interface'

export function isTranspiled(): boolean {
  return require.main?.filename?.endsWith('.js') ?? true
}

export function setupReactViews(
  app: Application,
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

export function addReactContext<T>(
  res: Response,
  context: Context<T>,
  value: T,
): void {
  const locals = (res as Response<string, ReactViewsContext<T>>).locals
  locals.contexts ??= []
  locals.contexts.unshift([context, value])
}

export function reactViews(reactViewOptions: ReactViewsOptions) {
  // eslint-disable-next-line complexity, sonarjs/cognitive-complexity
  return async function renderFile(
    ...[filename, options, next]: EngineCallbackParameters
  ): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { settings, _locals, cache, contexts, ...vars } =
      options as ExpressRenderOptions

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const Component = (await import(filename)).default

      if (!Component) {
        throw new Error(`Module ${filename} does not have a default export`)
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      let context = new TsxRenderContext(Component, vars)

      const defaultRenderer = new DefaultTsxRenderMiddleware()

      const middlewares = reactViewOptions.middlewares ?? []

      contexts?.forEach(([Context, props]) => {
        middlewares.push(new CreateReactContextRenderMiddleware(Context, props))
      })

      if (reactViewOptions.prettify ?? false) {
        middlewares.push(new PrettifyRenderMiddleware())
      }

      // eslint-disable-next-line sonarjs/no-ignored-return, unicorn/no-array-reduce
      middlewares.reduce((prev, next) => {
        prev.setNext(next)
        return next
      }, defaultRenderer)

      context = defaultRenderer.createElement(context)

      if (!context.hasElement()) {
        throw new Error('element was not created')
      }

      context = await defaultRenderer.render(context)

      if (!context.isRendered) {
        throw new Error('element was not rendered')
      }

      const doctype = reactViewOptions.doctype ?? '<!DOCTYPE html>\n'
      const transform = reactViewOptions.transform || ((html) => html)

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      next(null, await transform(doctype + context.html!))
    } catch (error) {
      next(error)
    }
  }
}
