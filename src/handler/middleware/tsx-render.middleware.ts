import { TsxRenderContext } from '../tsx-render-context'

/**
 * The default chaining behavior can be implemented inside a base handler class.
 */
export abstract class TsxRenderMiddleware {
  private next?: TsxRenderMiddleware

  public setNext(next: TsxRenderMiddleware): TsxRenderMiddleware {
    this.next = next
    return next
  }

  public createElement(context: TsxRenderContext): TsxRenderContext {
    if (this.next) {
      return this.next.createElement(context)
    }

    return context
  }

  public async render(context: TsxRenderContext): Promise<TsxRenderContext> {
    if (this.next) {
      return this.next.render(context)
    }

    return context
  }
}
