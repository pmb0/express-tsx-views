import React, { Context } from 'react'
import { TsxRenderContext } from '../tsx-render-context'
import { TsxRenderMiddleware } from './tsx-render.middleware'

export class CreateReactContextRenderMiddleware<
  T = unknown,
> extends TsxRenderMiddleware {
  readonly #context: Context<T>
  readonly #value: T

  constructor(context: Context<T>, value: T) {
    super()
    this.#context = context
    this.#value = value
  }

  public createElement(context: TsxRenderContext): TsxRenderContext {
    context.element = React.createElement(
      this.#context.Provider,
      { value: this.#value },
      context.element,
    )

    return super.createElement(context)
  }
}
