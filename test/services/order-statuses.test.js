const assert = require('assert')
const app = require('../../src/app')

describe('\'orderStatuses\' service', () => {
  it('registered the service', () => {
    const service = app.service('order-statuses')

    assert.ok(service, 'Registered the service')
  })
})
