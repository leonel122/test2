const createNotification = require("./hooks/createNotification");
const { isProvider, iff } = require("feathers-hooks-common");
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [iff(isProvider("external"), createNotification())],
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
