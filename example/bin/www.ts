import { AddressInfo } from 'net'
import { app } from '../app'

// eslint-disable-next-line no-magic-numbers
const server = app.listen(8080, function () {
  const { address, port } = server.address() as AddressInfo
  console.log('✔ Example app listening at http://%s:%s', address, port)
})
