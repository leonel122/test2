const assert = require('assert');
const app = require('../../src/app');

describe('\'send-push-notifications\' service', () => {
  it('registered the service', () => {
    const service = app.service('send-push-notifications');

    assert.ok(service, 'Registered the service');
  });
});
