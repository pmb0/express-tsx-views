import { resolve } from 'path'
import request from 'supertest'
import { setupReactViews } from '..'
import { app } from '../example/app'

describe('react-view-engine', () => {
  test('Rendering', async () => {
    const response = await request(app).get('/').expect(200)

    expect(response.text).toMatchInlineSnapshot(`
      "<!DOCTYPE html>
      <html lang=\\"de\\">
        <head>
          <style>
            h1{color:red}
          </style>
          <meta charset=\\"UTF-8\\" />
          <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />
          <title>Test</title>
        </head>
        <body>
          <h1>Test</h1>
          <p>Some component:</p>
          Hello from MyComponent! Provided prop: foo
        </body>
      </html>
      "
    `)
  })

  it('Rendering with locals', async () => {
    const response = await request(app).get('/with-locals').expect(200)

    expect(response.text).toMatchInlineSnapshot(`
      "<!DOCTYPE html>
      <html>
        <head>
          <style>
            h1{color:red}
          </style>
          <meta charset=\\"UTF-8\\" />
          <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />
          <title>from locals</title>
        </head>
        <body>
          <h1>from locals</h1>
          <p>Some component:</p>
          Hello from MyComponent! Provided prop: foo
        </body>
      </html>
      "
    `)
  })

  it('without DOCTYPE', async () => {
    setupReactViews(app, {
      viewsDirectory: resolve(__dirname, '../example/views'),
      prettify: true,
      doctype: '',
    })

    const response = await request(app).get('/with-locals').expect(200)
    expect(response.text).toMatchInlineSnapshot(`
      "<html>
        <head>
          <style>
            <!-- CSS -->
          </style>
          <meta charset=\\"UTF-8\\" />
          <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />
          <title>from locals</title>
        </head>
        <body>
          <h1>from locals</h1>
          <p>Some component:</p>
          Hello from MyComponent! Provided prop: foo
        </body>
      </html>
      "
    `)
  })
})
