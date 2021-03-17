// Initializes the `update-shops` service on path `/update-shops`
const { UpdateShops } = require('./update-shops.class');
const hooks = require('./update-shops.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/update-shops', new UpdateShops(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('update-shops');

  service.hooks(hooks);
};
