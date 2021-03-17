
// Application hooks that run for every service. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common')
// !code: imports
const log = require("./hooks/log");
const authorize = require("./hooks/abilities");
const authenticate = require("./hooks/authenticate");
// !end

// !code: used
// eslint-disable-next-line no-unused-vars
const { iff, when } = commonHooks;
// !end
// !code: init // !end

let moduleExports = {
  before: {
    // !code: before
    all: [
      log(),
      when(
        (hook) =>
          hook.params.provider &&
          `/${hook.path}` !== hook.app.get("authentication").path,
        authenticate,
        authorize()
      ),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
    // !end
  },

  after: {
    // !<DEFAULT> code: after
    all: [ log() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
    // !end
  },

  error: {
    // !<DEFAULT> code: error
    all: [ log() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
    // !end
  },
  // !code: moduleExports // !end
}

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
