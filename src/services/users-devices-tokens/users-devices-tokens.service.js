// Initializes the `users-devices-tokens` service on path `/users-devices-tokens`
const { UsersDevicesTokens } = require('./users-devices-tokens.class');
const createModel = require('../../models/users-devices-tokens.model');
const hooks = require('./users-devices-tokens.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/users-devices-tokens', new UsersDevicesTokens(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users-devices-tokens');

  service.hooks(hooks);
};
