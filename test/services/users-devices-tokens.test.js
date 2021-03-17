const assert = require('assert');
const app = require('../../src/app');

describe('\'users-devices-tokens\' service', () => {
  it('registered the service', () => {
    const service = app.service('users-devices-tokens');

    assert.ok(service, 'Registered the service');
  });
});
