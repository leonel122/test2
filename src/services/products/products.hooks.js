// Hooks for service `products`. (Can be re-generated.)
const commonHooks = require("feathers-hooks-common");
// eslint-disable-next-line no-unused-vars
const proccessProductBeforeCreate = require("./hooks/proccess-product-before-create");
// eslint-disable-next-line no-unused-vars
const proccessProducts = require("./hooks/proccess-products");
// eslint-disable-next-line no-unused-vars
const pushAlgoliaProduct = require("./hooks/push-algolia-product");
// eslint-disable-next-line no-unused-vars
const search = require("./hooks/search");
// eslint-disable-next-line no-unused-vars
const updateProducts = require("./hooks/update-products");
// !code: imports
const filtersShop = require("../../hooks/filters-shops");
// !end

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
} = require("./products.validate");
// !end

// !code: init
const ProductsJoin = {
  joins: {
    join: () => async (records, context) => {
      [records.shop] = await Promise.all([
        context.app
          .service("shops")
          .find({ query: { id: records.shop_id }, paginate: false })
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
    find: [iff(isProvider("external"), /* filtersShop(), */ search())],
    get: [iff(isProvider("external"), /* filtersShop(), */ search())],
    create: [
      proccessProducts(),
      proccessProductBeforeCreate(),
      // softDelete2()
    ],
    update: [
      // softDelete2()
    ],
    patch: [iff(isProvider("external"), updateProducts())],
    remove: [
      // softDelete2()
    ],
    // !end
  },

  after: {
    // !code: after
    all: [softDelete2()],
    find: [],
    get: [],
    create: [fastJoin(ProductsJoin), pushAlgoliaProduct()],
    update: [],
    patch: [fastJoin(ProductsJoin), pushAlgoliaProduct()],
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
