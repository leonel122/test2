const assert = require('assert')
const app = require('../../src/app')

describe('\'featuredProducts\' service', () => {
  it('registered the service', () => {
    const service = app.service('featured-products')

    assert.ok(service, 'Registered the service')
  })
})
