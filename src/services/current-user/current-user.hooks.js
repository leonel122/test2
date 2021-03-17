
// Hooks for service `currentUser`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common')
// eslint-disable-next-line no-unused-vars
const findCurrentUser = require('./hooks/find-current-user')
// !code: imports
const currentUser = require("./hooks/find-current-user");
// !end

// !code: used
// eslint-disable-next-line no-unused-vars
const { iff, disallow } = commonHooks;
// eslint-disable-next-line no-unused-vars
const {
  create,
  update,
  patch,
  validateCreate,
  validateUpdate,
  validatePatch,
} = require("./current-user.validate");
// !end

// !code: init // !end

let moduleExports = {
  before: {
    // !code: before
    all: [],
    find: [findCurrentUser()],
    get: [disallow("external")],
    create: [disallow("external")],
    update: [disallow("external")],
    patch: [disallow("external")],
    remove: [disallow("external")],
    // !end
  },

  after: {
    // !<DEFAULT> code: after
    all: [],
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
    all: [],
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
