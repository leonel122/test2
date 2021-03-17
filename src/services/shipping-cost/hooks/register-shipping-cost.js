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

    const query =
      user.role != "admin"
        ? { shop_id: user.shop.id }
        : { shop_id: records.shop_id };

    const [locality, shippingCost] = await Promise.all([
      context.app
        .service("localities")
        .getModel()
        .findOne({
          where: { id: records.locality_id, deletedAt: -1 },
        })
        .then((it) => it),
      context.app
        .service("shipping-cost")
        .getModel()
        .findOne({
          where: {
            id: records.locality_id,
            ...query,
            deletedAt: -1,
          },
        })
        .then((it) => it),
    ]);

    if (!locality) throw new NotFound("Localidad no encotrada.");

    if (shippingCost)
      throw new NotFound("Ya tienes un costo asociado para esta localidad.");

    records.user_id = user.id;
    records.shop_id = user.role == "admin" ? records.shop_id : user.shop.id;

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
