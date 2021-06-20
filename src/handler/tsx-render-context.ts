import { Component, ReactElement } from 'react'

export class TsxRenderContext {
  private _element?: ReactElement
  private _html?: string

  constructor(
    private readonly _component: Component,
    private readonly _vars: Record<string, unknown>,
  ) {}

  get component(): any {
    return this._component
  }

  get vars(): Record<string, unknown> {
    return this._vars
  }

  get element(): ReactElement | undefined {
    return this._element
  }

  set element(element: ReactElement | undefined) {
    this._element = element
  }

  get html(): string | undefined {
    return this._html
  }

  set html(html: string | undefined) {
    this._html = html
  }

  get isRendered(): boolean {
    return !!this._html
  }

  hasElement(): boolean {
    return this._element !== undefined
  }
}
