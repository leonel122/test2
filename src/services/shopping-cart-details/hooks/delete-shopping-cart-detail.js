// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {
  checkContext,
  getItems,
  replaceItems,
} = require("feathers-hooks-common");
const { NotFound } = require("@feathersjs/errors");
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

    const shoppingCartDetail = await context.app
      .service("shopping-cart-details")
      .getModel()
      .findOne({ where: { id: product_id, deletedAt: -1 } })
      .then((it) => it);

    if (shoppingCartDetail) {
      const shoppingCart = await context.app
        .service("shopping-cart")
        .getModel()
        .findOne({
          where: {
            id: records.token,
            deletedAt: -1,
          },
        });

      if (!shoppingCart) throw new NotFound("Carro de compras no encontrado.");
    } else {
      throw new NotFound("Carro de compras no encontrado.");
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
