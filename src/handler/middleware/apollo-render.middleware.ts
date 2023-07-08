import { ApolloClient } from '@apollo/client/core/index.js'
import { ApolloProvider } from '@apollo/client/react/index.js'
import { getMarkupFromTree } from '@apollo/client/react/ssr/index.js'
import React from 'react'
import { TsxRenderContext } from '../tsx-render-context.js'
import { TsxRenderMiddleware } from './tsx-render.middleware.js'

export class ApolloRenderMiddleware<T = unknown> extends TsxRenderMiddleware {
  #apollo: ApolloClient<T>

  constructor(apollo: ApolloClient<T>) {
    super()
    this.#apollo = apollo
  }

  public createElement(context: TsxRenderContext): TsxRenderContext {
    context.element = React.createElement(
      ApolloProvider,
      {
        client: this.#apollo,
        children: null,
      },
      context.element,
    )

    return super.createElement(context)
  }

  public async render(context: TsxRenderContext): Promise<TsxRenderContext> {
    context.html = await getMarkupFromTree({ tree: context.element })
    return super.render(context)
  }
}
