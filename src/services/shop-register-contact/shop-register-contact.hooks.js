
// Hooks for service `shopRegisterContact`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common')
// eslint-disable-next-line no-unused-vars
const registerShopContact = require('./hooks/register-shop-contact')
// !code: imports // !end

// !code: used
// eslint-disable-next-line no-unused-vars
const { iff } = commonHooks;
// eslint-disable-next-line no-unused-vars
const {
  create,
  update,
  patch,
  validateCreate,
  validateUpdate,
  validatePatch,
} = require("./shop-register-contact.validate");
// !end

// !code: init // !end

let moduleExports = {
  before: {
    // !code: before
    all: [],
    find: [],
    get: [],
    create: [registerShopContact()],
    update: [],
    patch: [],
    remove: [],
    // !end
  },

  after: {
    // !code: after
    all: [],
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
