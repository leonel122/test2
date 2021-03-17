const assert = require('assert')
const app = require('../../src/app')

describe('\'productsImages\' service', () => {
  it('registered the service', () => {
    const service = app.service('products-images')

    assert.ok(service, 'Registered the service')
  })
})
