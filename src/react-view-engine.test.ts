import express, { Express } from 'express'
import { setupReactViews, reactViews } from './react-view-engine'

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
      expect.assertions(1)

      try {
        // @ts-ignore
        setupReactViews(app, {})
      } catch (error) {
        expect(error).toEqual(new Error('viewsDirectory missing'))
      }
    })

    it('sets the view engine', () => {
      setupReactViews(app, { viewsDirectory: '/tmp' })

      expect(engineSpy).toBeCalledWith('tsx', expect.any(Function))
      expect(setSpy).toBeCalledWith('view engine', 'tsx')
      expect(setSpy).toBeCalledWith('views', '/tmp')
    })
  })

  describe('reactViews()', () => {
    it('catches missing JSX file errors', async () => {
      const renderFile = reactViews({ viewsDirectory: __dirname })

      const callback = jest.fn()
      await renderFile('does-not-exist', {}, callback)

      expect(callback).toBeCalledWith(
        expect.objectContaining({
          message: `Cannot find module 'does-not-exist' from 'src/react-view-engine.ts'`,
        })
      )
    })

    it('catches missing default exports', async () => {
      const renderFile = reactViews({ viewsDirectory: __dirname })

      const callback = jest.fn()

      // any .ts(x) file without a default export
      await renderFile(__filename, {}, callback)

      expect(callback).toBeCalledWith(
        expect.objectContaining({
          message: `Module ${__filename} does not have an default export`,
        })
      )
    })
  })
})
