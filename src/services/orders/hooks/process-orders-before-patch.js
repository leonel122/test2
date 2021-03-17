// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {
  checkContext,
  getItems,
  replaceItems,
} = require("feathers-hooks-common");
const { Forbidden, NotAcceptable } = require("@feathersjs/errors");
const { IoT1ClickProjects } = require("aws-sdk");
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

    const order = await context.app
      .service("orders")
      .find({
        query: { id: context.id },
        paginate: false,
      })
      .then((it) => it[0]);
    if (user.shop && user.role != "admin") {
      if (!order) throw new Forbidden("No tienes permiso.");

      if (records.order_status_id == 4) {
        if (order.order_status_id != 1)
          throw new Forbidden("No se puede rechazar la orden.");
      }

      if (records.order_status_id < order.order_status_id)
        throw NotAcceptable("No se puede cambiar el estado a la orden.");
    }

    if (records.order_status_id == 4) {
      if (!user.shop && user.role != "admin") {
        if (order.order_status_id != 1)
          throw new Forbidden("No se puede rechazar la orden.");
      }
    }

    if (records.order_status_id == 6) {
      if (user.id != order.user_id || order.order_status_id != 1)
        throw new Forbidden("No puedes cancelar esta orden");
    }

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
