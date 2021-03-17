// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {
  checkContext,
  getItems,
  replaceItems,
} = require("feathers-hooks-common");
const moment = require("moment");
const { NotAcceptable } = require("@feathersjs/errors");
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

    console.log("----------------");

    console.log(records);

    records.start_hour = moment(records.start_hour)
      .utcOffset(-5)
      .format("HH:mm:ss");

    records.end_hour = moment(records.end_hour)
      .utcOffset(-5)
      .format("HH:mm:ss");

    const schedule = await context.app
      .service("schedule")
      .getModel()
      .findOne({
        where: { day: records.day },
        shop_id: records.shop_id,
        deletedAt: -1,
      });

    if (schedule)
      throw new NotAcceptable("Ya tienes una horario para este dia");

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
