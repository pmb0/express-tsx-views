import express, { Express } from 'express'
import { resolve } from 'path'
import { reactViews, setupReactViews } from './react-view-engine.js'

describe('react-view-engine', () => {
  let app: Express
  let engineSpy: jest.SpyInstance
  let setSpy: jest.SpyInstance

  beforeEach(() => {
    app = express()
    engineSpy = jest.spyOn(app, 'engine').mockImplementation()
    setSpy = jest.spyOn(app, 'set').mockImplementation()
  })

  describe('setupReactViews()', () => {
    it('throws an error if "viewDirectory" was not provided', () => {
      // @ts-ignore
      expect(() => setupReactViews(app, {})).toThrow(
        new Error('viewsDirectory missing'),
      )
    })

    it('sets the view engine', () => {
      setupReactViews(app, { viewsDirectory: '/tmp' })

      expect(engineSpy).toHaveBeenCalledWith('tsx', expect.any(Function))
      expect(setSpy).toHaveBeenCalledWith('view engine', 'tsx')
      expect(setSpy).toHaveBeenCalledWith('views', '/tmp')
    })
  })

  describe('reactViews()', () => {
    it('catches missing JSX file errors', async () => {
      const renderFile = reactViews({ viewsDirectory: __dirname })

      const callback = jest.fn()
      await renderFile('does-not-exist', {}, callback)

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          message: `Cannot find module 'does-not-exist' from 'src/react-view-engine.ts'`,
        }),
      )
    })

    it('catches missing default exports', async () => {
      const renderFile = reactViews({ viewsDirectory: __dirname })

      const callback = jest.fn()

      // any .ts(x) file without a default export
      await renderFile(__filename, {}, callback)

      expect(callback).toHaveBeenCalledWith(
        new Error(`Module ${__filename} does not have a default export`),
      )
    })

    it('renders .tsx files', async () => {
      const renderFile = reactViews({ viewsDirectory: __dirname })

      const callback = jest.fn()

      await renderFile(
        resolve(__dirname, '../example/views/my-component'),
        {},
        callback,
      )

      expect(callback).toHaveBeenCalledWith(
        null,
        '<!DOCTYPE html>\nHello from MyComponent! Provided prop: <figure><pre></pre></figure>',
      )
    })
  })
})
