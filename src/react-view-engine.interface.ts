import { Application } from 'express'

export interface ReactViewsOptions {
  /**
   * The directory where your views (`.tsx` files) are stored. Must be
   * specified.
   */
  viewsDirectory: string

  /**
   * [Doctype](https://developer.mozilla.org/en-US/docs/Glossary/Doctype) to
   * be used. */
  doctype?: string

  /**
   * If activated, the generated HTML string is formatted using
   * [prettier](https://github.com/prettier/prettier)
   */
  prettify?: boolean

  /**
   * With this optional function the rendered HTML document can be modified. For
   * this purpose a function must be defined which gets the HTML `string` as
   * argument. The function returns a modified version of the HTML string as
   * `string`.
   */
  transform?: (html: string) => string | Promise<string>
}

export type EngineCallbackParameters = Parameters<
  Parameters<Application['engine']>[1]
>

export type ExpressLikeApp = Pick<Application, 'set' | 'engine'>
