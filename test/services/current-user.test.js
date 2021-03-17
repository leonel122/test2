const assert = require('assert')
const app = require('../../src/app')

describe('\'currentUser\' service', () => {
  it('registered the service', () => {
    const service = app.service('current-user')

    assert.ok(service, 'Registered the service')
  })
})
