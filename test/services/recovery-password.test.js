const assert = require('assert')
const app = require('../../src/app')

describe('\'recoveryPassword\' service', () => {
  it('registered the service', () => {
    const service = app.service('recovery-password')

    assert.ok(service, 'Registered the service')
  })
})
