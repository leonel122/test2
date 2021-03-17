
// Hooks for service `categories`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common')
// eslint-disable-next-line no-unused-vars
const proccessCategory = require('./hooks/proccess-category')
// !code: imports
// !end

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
} = require("./categories.validate");
// !end

// !code: init // !end

let moduleExports = {
  before: {
    // !code: before
    all: [softDelete2()],
    find: [],
    get: [],
    create: [proccessCategory()],
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
