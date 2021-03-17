// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {
  checkContext,
  getItems,
  replaceItems,
} = require("feathers-hooks-common");
const { NotAcceptable } = require("@feathersjs/errors");
const generate = require("nanoid/generate");

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

    const currentUser = await context.app
      .service("users")
      .getModel()
      .findOne({
        where: {
          phone: records.phone,
          deletedAt: -1,
        },
      });

    if (currentUser)
      throw new NotAcceptable("Ya exite un usuario con este telefono.");

    if (records.phone.charAt(0) != "3")
      throw new NotAcceptable("Debes enviar un celular valido.");

    if (records.phone.length != 10)
      throw new NotAcceptable("EL telefono debe tener 10 digitos.");

    records.token = generate("123456789", 4);

    records.role = "user";
    records.permissions = "user:*,shops:*";
    records.status = "inactive";
    records.delivery_free = 1;

    context.sendToken = "true";
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
