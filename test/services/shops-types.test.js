const assert = require('assert')
const app = require('../../src/app')

describe('\'shopsTypes\' service', () => {
  it('registered the service', () => {
    const service = app.service('shops-types')

    assert.ok(service, 'Registered the service')
  })
})
