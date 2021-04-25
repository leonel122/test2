// Hooks for service `shops`. (Can be re-generated.)
const commonHooks = require("feathers-hooks-common");
// eslint-disable-next-line no-unused-vars
const createSchedule = require("./hooks/create-schedule");
// eslint-disable-next-line no-unused-vars
const createShippingCost = require("./hooks/create-shipping-cost");
// eslint-disable-next-line no-unused-vars
const filterOwnerSHop = require("./hooks/filter-owner-s-hop");
// eslint-disable-next-line no-unused-vars
const proccessShopBeforeCreate = require("./hooks/proccess-shop-before-create");
// eslint-disable-next-line no-unused-vars
const restrictActivateShop = require("./hooks/restrict-activate-shop");
// eslint-disable-next-line no-unused-vars
const searchShops = require("./hooks/search-shops");
// eslint-disable-next-line no-unused-vars
const updateAlgolia = require("./hooks/update-algolia");
// !code: imports
const moment = require("moment");
const asingSlug = require("./hooks/asing-slug");
const countViews = require("./hooks/count-views");
// !end

// !code: used
// eslint-disable-next-line no-unused-vars
const { iff, disallow, softDelete2, fastJoin, isProvider } = commonHooks;
// eslint-disable-next-line no-unused-vars
const {
  create,
  update,
  patch,
  validateCreate,
  validateUpdate,
  validatePatch,
} = require("./shops.validate");
const filtersShops = require("../../hooks/filters-shops");
const { CostExplorer } = require("aws-sdk");
// !end

// !code: init
const JoinRequests = {
  joins: {
    join: () => async (records, context) => {
      const date = moment().utcOffset(-5).format("YYYY-MM-DD");
      let dayWeek = moment(date).day();

      // console.log(dayWeek, "dayWeek");
      console.log(records.id, "-----------------");
      const schedule = await context.app
        .service("schedule")
        .find({
          query: {
            $select: ["start_hour", "id", "shop_id", "day"],
            shop_id: records.id,
            day: `${dayWeek}`,
          },
          paginate: false,
        })
        .then((it) => it[0]);

      console.log(schedule);

      const currentHour = moment().utcOffset(-5).format("YYYY-MM-DD HH:mm:ss");
      const start_hour = moment(
        `${moment(currentHour).format("YYYY-MM-DD")} ${schedule.start_hour}`
      ).format("YYYY-MM-DD HH:mm:ss");

      if (
        records.current_status == "close" &&
        moment(start_hour).isBefore(currentHour)
      ) {
        dayWeek = dayWeek == 6 ? 0 : dayWeek + 1;
      }

      [records.category, records.open] = await Promise.all([
        context.app
          .service("categories")
          .find({ query: { id: records.category_id }, paginate: false })
          .then((it) => it[0]),
        context.app
          .service("schedule")
          .find({
            query: {
              $select: ["start_hour", "id", "shop_id", "day", "status"],
              shop_id: records.id,
              day: `${dayWeek}`,
            },
            paginate: false,
          })
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
    find: [iff(isProvider("external"), /* filterOwnerSHop(), */ searchShops())],
    get: [iff(isProvider("external"), /* filterOwnerSHop(), */ searchShops())],
    create: [proccessShopBeforeCreate()],
    update: [disallow("external")],
    patch: [restrictActivateShop()],
    remove: [],
    // !end
  },

  after: {
    // !code: after
    all: [softDelete2()],
    find: [fastJoin(JoinRequests)],
    get: [fastJoin(JoinRequests), iff(isProvider("external"), countViews())],
    create: [createSchedule(), createShippingCost(), asingSlug()],
    update: [],
    patch: [asingSlug(), updateAlgolia()],
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
