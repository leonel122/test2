
// Hooks for service `schedule`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common')
// eslint-disable-next-line no-unused-vars
const updateSchedule = require('./hooks/update-schedule')
// !code: imports
const createSchedule = require("./hooks/create-schedule");
// !end

// !code: used
// eslint-disable-next-line no-unused-vars
const { iff, disallow, fastJoin, softDelete2 } = commonHooks;
// eslint-disable-next-line no-unused-vars
const {
  create,
  update,
  patch,
  validateCreate,
  validateUpdate,
  validatePatch,
} = require("./schedule.validate");
// !end

// !code: init
const Join = {
  joins: {
    join: () => async (records, context) => {
      [records.shop] = await Promise.all([
        context.app
          .service("shops")
          .getModel()
          .findOne({
            attributes: ["id", "name"],
            where: { id: records.shop_id, deletedAt: -1 },
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
    create: [createSchedule()],
    update: [],
    patch: [updateSchedule()],
    remove: [disallow("external")],
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
