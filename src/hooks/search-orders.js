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

    if (user) {
      if (context.params.query && context.params.query.search) {
        const search = context.params.query.search;
        delete context.params.query.search;

        const sequelize = context.app.get("sequelizeClient");

        console.log(search);

        const query = `SELECT
        orders.id AS id 
      FROM
        orders
        INNER JOIN users ON orders.user_id = users.id 
      WHERE
        \`VALUE\` LIKE "%${search}%"
        OR total_value LIKE "%${search}%"
        OR users.first_name LIKE "%${search}%"
        OR users.last_name LIKE "%${search}%"
        OR users.phone LIKE "%${search}%"
      AND users.deletedAt = "1969-12-31 23:59:59"`;

        const ordersIds = await sequelize
          .query(query, { type: sequelize.QueryTypes.SELECT })
          .then((it) => it.map((it) => it.id));

        context.params.query = {
          id: { $in: ordersIds },
        };
      }
    }

    // Place the modified records back in the context.
    replaceItems(context, records);
    // Best practice: hooks should always return the context.
    return context;
  };
};

// Throw to reject the service call, or on an unrecoverable error.
// eslint-disable-next-line no-unused-vars
function error(msg) {
  throw new Error(msg);
}
