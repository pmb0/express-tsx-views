import { Application } from 'express'

export interface ReactViewsOptions {
  doctype?: string
  prettify?: boolean
  viewsDirectory: string
  transform?: (html: string) => string | Promise<string>
}

export type EngineCallbackParameters = Parameters<
  Parameters<Application['engine']>[1]
>

export type ExpressLikeApp = Pick<Application, 'set' | 'engine'>
