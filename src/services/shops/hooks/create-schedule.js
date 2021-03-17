// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {
  checkContext,
  getItems,
  replaceItems,
} = require("feathers-hooks-common");

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

    const schedule = [
      {
        day: "0",
        start_hour: "14:00",
        end_hour: "20:00",
        shop_id: records.id,
        status: "active",
      },
      {
        day: "1",
        start_hour: "08:00",
        end_hour: "18:00",
        shop_id: records.id,
        status: "active",
      },
      {
        day: "2",
        start_hour: "08:00",
        end_hour: "18:00",
        shop_id: records.id,
        status: "active",
      },
      {
        day: "3",
        start_hour: "08:00",
        end_hour: "18:00",
        shop_id: records.id,
        status: "active",
      },
      {
        day: "4",
        start_hour: "08:00",
        end_hour: "18:00",
        shop_id: records.id,
        status: "active",
      },
      {
        day: "5",
        start_hour: "08:00",
        end_hour: "14:00",
        shop_id: records.id,
        status: "active",
      },
      {
        day: "6",
        start_hour: "08:00",
        end_hour: "14:00",
        shop_id: records.id,
        status: "active",
      },
    ];

    console.log(schedule);

    await context.app.service("schedule").create(schedule);

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
