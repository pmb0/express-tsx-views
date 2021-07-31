import { resolve } from 'path'
import request from 'supertest'
import { app } from '../example/app'
import { setupReactViews } from '../src'

describe('react-view-engine', () => {
  test('Rendering', async () => {
    const response = await request(app).get('/').expect(200)

    expect(response.text).toMatchSnapshot()
  })

  test('Rendering with locals', async () => {
    const response = await request(app).get('/with-locals').expect(200)

    expect(response.text).toMatchSnapshot()
  })

  test('without DOCTYPE', async () => {
    setupReactViews(app, {
      viewsDirectory: resolve(__dirname, '../example/views'),
      prettify: true,
      doctype: '',
    })

    const response = await request(app).get('/with-locals').expect(200)
    expect(response.text).toMatchInlineSnapshot(`
      "<html><head><style><!-- CSS --></style><meta charSet=\\"UTF-8\\"/><meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\"/><title>from locals</title></head><body><h1>from locals</h1><p>Some component:</p>Hello from MyComponent! Provided prop: <figure><pre>&quot;foo&quot;</pre></figure><hr/><figure><figcaption>props:</figcaption><pre>{
        &quot;title&quot;: &quot;from locals&quot;
      }</pre></figure><hr/><figure><figcaption>context1:</figcaption><pre>{
        &quot;id&quot;: 1,
        &quot;name&quot;: &quot;test&quot;
      }</pre></figure><hr/><figure><figcaption>context2:</figcaption><pre></pre></figure></body></html>"
    `)
  })
})
