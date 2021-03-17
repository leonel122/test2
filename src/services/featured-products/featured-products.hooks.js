
// Hooks for service `featuredProducts`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common')
// !code: imports // !end

// !code: used
// eslint-disable-next-line no-unused-vars
const { iff, fastJoin } = commonHooks;
// eslint-disable-next-line no-unused-vars
const {
  create,
  update,
  patch,
  validateCreate,
  validateUpdate,
  validatePatch,
} = require("./featured-products.validate");
// !end

// !code: init
const join = {
  joins: {
    join: () => async (records, context) => {
      [records.product] = await Promise.all([
        context.app
          .service("products")
          .getModel()
          .findOne({
            attributes: ["id", "image", "value", "name"],
            where: { id: records.product_id },
          }),
      ]);
    },
  },
};

// !end

let moduleExports = {
  before: {
    // !code: before
    all: [],
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
    find: [fastJoin(join)],
    get: [fastJoin(join)],
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
