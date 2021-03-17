const assert = require('assert')
const app = require('../../src/app')

describe('\'shippingCost\' service', () => {
  it('registered the service', () => {
    const service = app.service('shipping-cost')

    assert.ok(service, 'Registered the service')
  })
})
