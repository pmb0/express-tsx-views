import React from 'react'
import ReactDOM from 'react-dom/server'
import { TsxRenderContext } from '../tsx-render-context'
import { TsxRenderMiddleware } from './tsx-render.middleware'

/**
 * All Concrete Handlers either handle a request or pass it to the next handler
 * in the chain.
 */
export class DefaultTsxRenderMiddleware extends TsxRenderMiddleware {
  public createElement(context: TsxRenderContext): TsxRenderContext {
    context.element = React.createElement(context.component, context.vars)
    return super.createElement(context)
  }

  public async render(context: TsxRenderContext): Promise<TsxRenderContext> {
    if (!context.isRendered && context.element) {
      context.html = ReactDOM.renderToStaticMarkup(context.element)
    }

    return super.render(context)
  }
}
