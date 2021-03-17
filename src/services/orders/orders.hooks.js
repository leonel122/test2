
// Hooks for service `orders`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common')
// eslint-disable-next-line no-unused-vars
const proccessOrderAfterPatch = require('./hooks/proccess-order-after-patch')
// eslint-disable-next-line no-unused-vars
const processOrderBeforeCreate = require('./hooks/process-order-before-create')
// eslint-disable-next-line no-unused-vars
const processOrdersAfterPatch = require('./hooks/process-orders-after-patch')
// eslint-disable-next-line no-unused-vars
const processOrdersBeforeCreate = require('./hooks/process-orders-before-create')
// eslint-disable-next-line no-unused-vars
const processOrdersBeforePatch = require('./hooks/process-orders-before-patch')
// !code: imports
const searchOrder = require("../../hooks/search-orders");
const filtersShop = require("../../hooks/filters-shops");
const orderHistory = require("../../hooks/order-history");
// !end

// !code: used
// eslint-disable-next-line no-unused-vars
const { iff, softDelete2, isProvider, fastJoin, discard } = commonHooks;
// eslint-disable-next-line no-unused-vars
const {
  create,
  update,
  patch,
  validateCreate,
  validateUpdate,
  validatePatch,
} = require("./orders.validate");
// !end

// !code: init
const OrdersJoin = {
  joins: {
    join: () => async (records, context) => {
      [
        records.orders_details,
        records.order_status,
        records.shop,
        records.user,
        records.order_history,
      ] = await Promise.all([
        context.app
          .service("order-details")
          .find({ query: { order_id: records.id }, paginate: false })
          .then((it) => it),
        context.app
          .service("order-statuses")
          .find({ query: { id: records.order_status_id }, paginate: false })
          .then((it) => it[0]),
        context.app
          .service("shops")
          .getModel()
          .findOne({
            attributes: ["id", "name", "phone", "address"],
            where: { id: records.shop_id },
          })
          .then((it) => it),
        context.app
          .service("users")
          .getModel()
          .findOne({
            attributes: ["id", "first_name", "last_name", "phone", "email"],
            where: { id: records.user_id },
          })
          .then((it) => it),
        context.app
          .service("order-history")
          .find({ query: { order_id: records.id }, paginate: false })
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
    find: [searchOrder(), iff(isProvider("external"), filtersShop())],
    get: [searchOrder(), iff(isProvider("external"), filtersShop())],
    create: [iff(isProvider("external"), processOrdersBeforeCreate())],
    update: [],
    patch: [
      iff(
        isProvider("external"),
        discard(
          "shop_id",
          "user_id",
          "value",
          "total_value",
          "shipping_cost",
          "shopping_cart_id",
          "delivery_time",
          "meta_data",
          "shop_meta_data",
          "shipping_meta_data"
        ),
        processOrdersBeforePatch()
      ),
    ],
    remove: [],
    // !end
  },

  after: {
    // !code: after
    all: [softDelete2()],
    find: [searchOrder(), fastJoin(OrdersJoin)],
    get: [searchOrder(), fastJoin(OrdersJoin)],
    create: [],
    update: [],
    patch: [
      proccessOrderAfterPatch(),
      iff(isProvider("external"), orderHistory()),
    ],
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
