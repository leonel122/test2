const assert = require('assert')
const app = require('../../src/app')

describe('\'ordersDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('orders-details')

    assert.ok(service, 'Registered the service')
  })
})
