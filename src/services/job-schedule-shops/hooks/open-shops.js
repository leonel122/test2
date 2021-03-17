// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {
  checkContext,
  getItems,
  replaceItems,
} = require("feathers-hooks-common");
const moment = require("moment");
const lodash = require("lodash");
// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  // Return the actual hook.
  return async (context) => {
    // Throw if the hook is being called from an unexpected location.
    checkContext(context, null, [
      "find",
      "get",
      "create",
      "update",
      "patch",
      "remove",
    ]);

    // Get the authenticated user.
    // eslint-disable-next-line no-unused-vars
    const { user } = context.params;
    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    const records = getItems(context);

    const day = moment().utcOffset(-5).day();
    const currentHour = moment().utcOffset(-5).format("HH:mm:ss");

    const sequelize = context.app.get("sequelizeClient");

    const query = `SELECT * from schedule sc
where
((sc.end_hour < sc.start_hour AND (sc.start_hour <= '${currentHour}' OR sc.end_hour >= '${currentHour}')) OR
(sc.end_hour > sc.start_hour AND sc.start_hour <= '${currentHour}' AND sc.end_hour >= '${currentHour}'))
AND sc.status = 'active' AND sc.day = "${day}";`;

    const shops = await sequelize
      .query(query, { type: sequelize.QueryTypes.SELECT })
      .then((it) => it)
      .map((it) => it.shop_id);

    console.log(shops);

    await context.app
      .service("shops")
      .getModel()
      .update(
        { current_status: "open" },
        {
          where: {
            id: { $in: shops },
          },
        }
      );

    await context.app
      .service("shops")
      .getModel()
      .update(
        { current_status: "close" },
        {
          where: {
            id: { $notIn: shops },
            deletedAt: -1,
          },
        }
      );

    // Place the modified records back in the context.
    replaceItems(context, records);
    // Best practice: hooks should always return the context.
    return context;
  };
};

// Throw on unrecoverable error.
// eslint-disable-next-line no-unused-vars
function error(msg) {
  throw new Error(msg);
}
