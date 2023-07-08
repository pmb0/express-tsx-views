import { AddressInfo } from 'net'
import { app } from '../app.js'

// eslint-disable-next-line no-magic-numbers, @typescript-eslint/no-magic-numbers
const server = app.listen(8080, function () {
  const { address, port } = server.address() as AddressInfo
  // eslint-disable-next-line no-console
  console.log('✔ Example app listening at http://%s:%s', address, port)
})
