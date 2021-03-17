
// Hooks for service `orderHistory`. (Can be re-generated.)
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
} = require("./order-history.validate");
// !end

// !code: init
const OrderHistoryJoin = {
  joins: {
    join: () => async (records, context) => {
      [records.order_status] = await Promise.all([
        context.app
          .service("order-statuses")
          .find({ query: { id: records.order_status_id }, paginate: false })
          .then((it) => it[0]),
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
    create: [],
    update: [],
    patch: [],
    remove: [],
    // !end
  },

  after: {
    // !code: after
    all: [],
    find: [commonHooks.fastJoin(OrderHistoryJoin)],
    get: [commonHooks.fastJoin(OrderHistoryJoin)],
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
