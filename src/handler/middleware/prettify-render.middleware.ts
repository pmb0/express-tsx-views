import prettier from 'prettier'
import { TsxRenderContext } from '../tsx-render-context.js'
import { TsxRenderMiddleware } from './tsx-render.middleware.js'

export class PrettifyRenderMiddleware extends TsxRenderMiddleware {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async render(context: TsxRenderContext): Promise<TsxRenderContext> {
    if (context.html) {
      context.html = prettier.format(context.html, {
        parser: 'html',
      })
    }

    return context
  }
}
