
// Hooks for service `shoppingCartDetails`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common')
const { authenticate } = require('@feathersjs/authentication').hooks
// eslint-disable-next-line no-unused-vars
const deleteShoppingCartDetail = require('./hooks/delete-shopping-cart-detail')
// eslint-disable-next-line no-unused-vars
const processShoppingCartDetailsBeforeCreate = require('./hooks/process-shopping-cart-details-before-create')
// !code: imports // !end

// !code: used
// eslint-disable-next-line no-unused-vars
const { iff, softDelete2, fastJoin, isProvider, disallow } = commonHooks;
// eslint-disable-next-line no-unused-vars
const {
  create,
  update,
  patch,
  validateCreate,
  validateUpdate,
  validatePatch,
} = require("./shopping-cart-details.validate");
// !end

// !code: init
const ShoppingCartDetailsJoin = {
  joins: {
    join: () => async (records, context) => {
      const { user } = context.params;
      [records.shop, records.product, records.userAddress] = await Promise.all([
        context.app
          .service("shops")
          .find({ query: { id: records.shop_id }, paginate: false })
          .then((it) => it[0]),
        context.app
          .service("products")
          .find({ query: { id: records.product_id }, paginate: false })
          .then((it) => it[0]),
      ]);
    },
  },
};
// !end

let moduleExports = {
  before: {
    // Your hooks should include:
    //   all   : authenticate('jwt')
    // !code: before
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [
      iff(isProvider("external"), processShoppingCartDetailsBeforeCreate()),
    ],
    update: [disallow("external")],
    patch: [disallow("external")],
    remove: [deleteShoppingCartDetail()],
    // !end
  },

  after: {
    // !code: after
    all: [],
    find: [fastJoin(ShoppingCartDetailsJoin)],
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
