const assert = require('assert')
const app = require('../../src/app')

describe('\'shopRegisterContact\' service', () => {
  it('registered the service', () => {
    const service = app.service('shop-register-contact')

    assert.ok(service, 'Registered the service')
  })
})
