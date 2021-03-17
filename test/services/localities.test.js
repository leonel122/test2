const assert = require('assert')
const app = require('../../src/app')

describe('\'localities\' service', () => {
  it('registered the service', () => {
    const service = app.service('localities')

    assert.ok(service, 'Registered the service')
  })
})
