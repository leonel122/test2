// Hooks for service `shoppingCart`. (Can be re-generated.)
const commonHooks = require("feathers-hooks-common");
const { authenticate } = require("@feathersjs/authentication").hooks;
// eslint-disable-next-line no-unused-vars
const processShoppingCartAfterCreate = require("./hooks/process-shopping-cart-after-create");
// eslint-disable-next-line no-unused-vars
const processShoppingCartBeforeCreate = require("./hooks/process-shopping-cart-before-create");
// !code: imports
const removeSodtDelete = require("../../hooks/softdelete");
// !end

// !code: used
// eslint-disable-next-line no-unused-vars
const {
  iff,
  softDelete2,
  fastJoin,
  isProvider,
  paramsFromClient,
} = commonHooks;
// eslint-disable-next-line no-unused-vars
const {
  create,
  update,
  patch,
  validateCreate,
  validateUpdate,
  validatePatch,
} = require("./shopping-cart.validate");
// !end

// !code: init
const ShoppingCartJoin = {
  joins: {
    join: () => async (records, context) => {
      [records.shopping_cart_details] = await Promise.all([
        context.app
          .service("shopping-cart-details")
          .find({
            query: {
              shopping_cart_id: records.id,
            },
            paginate: false,
          })
          .then((it) => it),
      ]);
      let userAddress = {};

      const { user, address_id } = context.params;

      let deliverysFree = user ? user.delivery_free : 0;

      for (
        let index = 0;
        index < records.shopping_cart_details.length;
        index++
      ) {
        let shippingCost = null;

        let params = {};
        if (user && address_id) {
          params = { user_id: user.id, id: address_id };
        } else if (user) {
          params = { user_id: user.id, main: "true" };
        }

        userAddress = await context.app
          .service("addresses")
          .find({
            query: { ...params },
            paginate: false,
          })
          .then((it) => it[0]);

        if (userAddress) {
          shippingCost = await context.app
            .service("shipping-cost")
            .getModel()
            .findOne({
              where: {
                locality_id: userAddress.locality_id,
                shop_id: records.shopping_cart_details[index].shop_id,
              },
            })
            .then((it) => it);

          records.shopping_cart_details[index].shipping_cost =
            deliverysFree >= 1
              ? { price: 0 }
              : shippingCost
              ? shippingCost
              : null;

          deliverysFree ? deliverysFree-- : null;
        }
      }
      records.address = userAddress ? userAddress : null;
    },
  },
};
// !end

let moduleExports = {
  before: {
    // Your hooks should include:
    //   all   : authenticate('jwt')
    // !code: before
    all: [],
    find: [paramsFromClient("address_id"), softDelete2()],
    get: [paramsFromClient("address_id"), softDelete2()],
    create: [
      iff(isProvider("external"), processShoppingCartBeforeCreate()),
      softDelete2(),
    ],
    update: [],
    patch: [softDelete2()],
    remove: [removeSodtDelete()],
    // !end
  },

  after: {
    // !code: after
    all: [fastJoin(ShoppingCartJoin)],
    find: [fastJoin(ShoppingCartJoin)],
    get: [],
    create: [processShoppingCartAfterCreate()],
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
    remove: [],
    // !end
  },
  // !code: moduleExports // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
