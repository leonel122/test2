
// Hooks for service `addresses`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common')
// eslint-disable-next-line no-unused-vars
const patchUserAddresses = require('./hooks/patch-user-addresses')
// eslint-disable-next-line no-unused-vars
const registerAddress = require('./hooks/register-address')
// !code: imports
const removeSoftDelete = require("../../hooks/softdelete");
// !end

// !code: used
// eslint-disable-next-line no-unused-vars
const { iff, softDelete2, fastJoin, disallow } = commonHooks;
// eslint-disable-next-line no-unused-vars
const {
  create,
  update,
  patch,
  validateCreate,
  validateUpdate,
  validatePatch,
} = require("./addresses.validate");
// !end

// !code: init
const join = {
  joins: {
    join: () => async (records, context) => {
      [records.locality] = await Promise.all([
        context.app.service("localities").get(records.locality_id),
      ]);
    },
  },
};
// !end

let moduleExports = {
  before: {
    // !code: before
    all: [],
    find: [softDelete2()],
    get: [softDelete2()],
    create: [registerAddress(), softDelete2()],
    update: [],
    patch: [softDelete2()],
    remove: [removeSoftDelete()],
    // !end
  },

  after: {
    // !code: after
    all: [softDelete2()],
    find: [fastJoin(join)],
    get: [fastJoin(join)],
    create: [patchUserAddresses()],
    update: [],
    patch: [patchUserAddresses()],
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
