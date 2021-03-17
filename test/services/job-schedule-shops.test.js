const assert = require('assert')
const app = require('../../src/app')

describe('\'jobScheduleShops\' service', () => {
  it('registered the service', () => {
    const service = app.service('job-schedule-shops')

    assert.ok(service, 'Registered the service')
  })
})
