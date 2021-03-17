const assert = require('assert')
const app = require('../../src/app')

describe('\'unitMeasure\' service', () => {
  it('registered the service', () => {
    const service = app.service('unit-measure')

    assert.ok(service, 'Registered the service')
  })
})
