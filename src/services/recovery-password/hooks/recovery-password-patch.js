// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {
  checkContext,
  getItems,
  replaceItems,
} = require("feathers-hooks-common");
const errors = require("@feathersjs/errors");

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

    const { user } = context.params;
    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    const records = getItems(context);

    if (records.token_reset_password && records.password) {
      const data = await context.app
        .service("users")
        .getModel()
        .findOne({
          where: {
            token_reset_password: records.token_reset_password,
          },
        });

      if (!data) {
        throw new errors.NotFound("Codigo no encontrado");
      }

      await context.app.service("users").patch(data.id, {
        password: records.password,
        token_reset_password: null,
      });

      context.result = {};

      delete records.token;
      delete records.password;
    }

    // Place the modified records back in the context.
    replaceItems(context, records);
    // Best practice: hooks should always return the context.
    return context;
  };
};

// Throw on unrecoverable error.

function error(msg) {
  throw new Error(msg);
}
