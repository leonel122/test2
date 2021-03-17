
// Hooks for service `unitMeasure`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common')
const { authenticate } = require('@feathersjs/authentication').hooks
// !code: imports
// !end

// !code: used
// eslint-disable-next-line no-unused-vars
const { iff, softDelete2, disallow } = commonHooks;
// eslint-disable-next-line no-unused-vars
const {
  create,
  update,
  patch,
  validateCreate,
  validateUpdate,
  validatePatch,
} = require("./unit-measure.validate");
// !end

// !code: init // !end

let moduleExports = {
  before: {
    // Your hooks should include:
    //   all   : authenticate('jwt')
    // !code: before
    all: [softDelete2()],
    find: [],
    get: [],
    create: [authenticate("jwt")],
    update: [disallow("external")],
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
