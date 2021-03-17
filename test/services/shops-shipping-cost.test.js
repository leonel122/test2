const assert = require('assert')
const app = require('../../src/app')

describe('\'shopsShippingCost\' service', () => {
  it('registered the service', () => {
    const service = app.service('shops-shipping-cost')

    assert.ok(service, 'Registered the service')
  })
})
