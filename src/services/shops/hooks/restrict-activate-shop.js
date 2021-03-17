// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {
  checkContext,
  getItems,
  replaceItems,
} = require("feathers-hooks-common");
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

    const shop = await context.app
      .service("shops")
      .getModel()
      .findOne({ where: { id: context.id, deletedAt: -1 } });

    if (records.status == "Activa" && user.role == "admin") {
      if (shop.logo == null || shop.logo == "")
        throw new NotAcceptable(
          "No se puede activar la tienda por que no tiene un logo asignado."
        );
    } else if (records.status == "Activa" && user.role == "user") {
      if (shop.logo == null || shop.logo == "")
        throw new NotAcceptable(
          "No se puede publicar la tienda por que le hace falta el logo."
        );

      const product = await context.app
        .service("products")
        .getModel()
        .findOne({
          where: { shop_id: shop.id, status: "active", deletedAt: -1 },
        });

      if (!product)
        throw new NotAcceptable(
          "No se puede publicar la tienda por que no tiene productos activos."
        );
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
