
// Hooks for service `localities`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common')
// !code: imports // !end

// !code: used
// eslint-disable-next-line no-unused-vars
const { iff, softDelete2 } = commonHooks;
// eslint-disable-next-line no-unused-vars
const {
  create,
  update,
  patch,
  validateCreate,
  validateUpdate,
  validatePatch,
} = require("./localities.validate");
// !end

// !code: init // !end

let moduleExports = {
  before: {
    // !code: before
    all: [softDelete2()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
    // !end
  },

  after: {
    // !code: after
    all: [softDelete2()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
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
