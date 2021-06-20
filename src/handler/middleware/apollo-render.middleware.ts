import { ApolloClient, ApolloProvider } from '@apollo/client'
import { getMarkupFromTree } from '@apollo/client/react/ssr'
import React from 'react'
import { TsxRenderContext } from '../tsx-render-context'
import { TsxRenderMiddleware } from './tsx-render.middleware'

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
