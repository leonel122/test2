
// Hooks for service `shopsShippingCost`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common')
const { authenticate } = require('@feathersjs/authentication').hooks
// eslint-disable-next-line no-unused-vars
const processShopsShippingCostBeforeCreate = require('./hooks/process-shops-shipping-cost-before-create')
// !code: imports
const restrictToOwner = require('../../hooks/restrict-to-owner');
// !end

// !code: used
// eslint-disable-next-line no-unused-vars
const { iff, softDelete2 } = commonHooks
// eslint-disable-next-line no-unused-vars
const { create, update, patch, validateCreate, validateUpdate, validatePatch } = require('./shops-shipping-cost.validate')
// !end

// !code: init // !end

let moduleExports = {
  before: {
    // Your hooks should include:
    //   all   : authenticate('jwt')
    // !code: before
    all: [
      authenticate('jwt'),
      softDelete2()
    ],
    find: [],
    get: [],
    create: [
      processShopsShippingCostBeforeCreate()
    ],
    update: [],
    patch: [],
    remove: []
    // !end
  },

  after: {
    // !code: after
    all: [
      softDelete2()
    ],
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
