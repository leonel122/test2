const sendPushNotifications = require("./hooks/send-push-notifications");

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [sendPushNotifications()],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
