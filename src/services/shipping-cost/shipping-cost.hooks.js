
// Hooks for service `shippingCost`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common')
// eslint-disable-next-line no-unused-vars
const registerShippingCost = require('./hooks/register-shipping-cost')
// !code: imports // !end

// !code: used
// eslint-disable-next-line no-unused-vars
const { iff, softDelete2, fastJoin, isProvider } = commonHooks;
// eslint-disable-next-line no-unused-vars
const {
  create,
  update,
  patch,
  validateCreate,
  validateUpdate,
  validatePatch,
} = require("./shipping-cost.validate");
// !end

// !code: init
const Join = {
  joins: {
    join: () => async (records, context) => {
      [records.shop, records.locality] = await Promise.all([
        context.app
          .service("shops")
          .getModel()
          .findOne({
            attributes: ["id", "name"],
            where: { id: records.shop_id, deletedAt: -1 },
          })
          .then((it) => it),
        context.app
          .service("localities")
          .getModel()
          .findOne({
            where: { id: records.locality_id, deletedAt: -1 },
          })
          .then((it) => it),
      ]);
    },
  },
};
// !end

let moduleExports = {
  before: {
    // !code: before
    all: [softDelete2()],
    find: [],
    get: [],
    create: [iff(isProvider("external"), registerShippingCost())],
    update: [],
    patch: [],
    remove: [],
    // !end
  },

  after: {
    // !code: after
    all: [softDelete2()],
    find: [fastJoin(Join)],
    get: [fastJoin(Join)],
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
