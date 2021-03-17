// Initializes the `send-push-notifications` service on path `/send-push-notifications`
const { SendPushNotifications } = require('./send-push-notifications.class');
const hooks = require('./send-push-notifications.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/send-push-notifications', new SendPushNotifications(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('send-push-notifications');

  service.hooks(hooks);
};
