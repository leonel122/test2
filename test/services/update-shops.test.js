const assert = require('assert');
const app = require('../../src/app');

describe('\'update-shops\' service', () => {
  it('registered the service', () => {
    const service = app.service('update-shops');

    assert.ok(service, 'Registered the service');
  });
});
