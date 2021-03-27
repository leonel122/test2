// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {
  checkContext,
  getItems,
  replaceItems,
} = require("feathers-hooks-common");
const { NotAcceptable, NotFound } = require("@feathersjs/errors");
// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  // Return the actual hook.
  return async (context) => {
    // Throw if the hook is being called from an unexpected location.
    checkContext(context, null, ["create"]);

    // Get the authenticated user.
    // eslint-disable-next-line no-unused-vars
    const { user } = context.params;
    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    const records = getItems(context);

    const [product, shoppingCart] = await Promise.all([
      context.app
        .service("products")
        .getModel()
        .findOne({ where: { id: records.product_id } })
        .then((it) => it),
      context.app
        .service("shopping-cart")
        .getModel()
        .findOne({
          where: {
            token: records.token,
            user_id: user.id,
            status: "Active",
          },
        })
        .then((it) => it),
    ]);

    if (!shoppingCart) error(NotFound, "No se encontro el carro de compras.");

    const shoppingCartDetail = await context.app
      .service("shopping-cart-details")
      .getModel()
      .findOne({
        where: {
          product_id: records.product_id,
          shopping_cart_id: shoppingCart.id,
        },
      })
      .then((it) => it);

    if (!shoppingCart)
      throw new NotAcceptable(
        "No se encontro el carro de compra, crea uno nuevo."
      );

    if (product & (product.quantity < records.quantity))
      throw new NotAcceptable(
        "No hay sufiencite stock para este producto por el momento"
      );
    if (shoppingCartDetail && shoppingCart) {
      const product = await context.app
        .service("shopping-cart-details")
        .patch(shoppingCartDetail.id, { quantity: records.quantity });

      if (product) context.result = product;
    }

    // Place the modified records back in the context.
    replaceItems(context, records);
    // Best practice: hooks should always return the context.
    return context;
  };
};

// Throw on unrecoverable error.
// eslint-disable-next-line no-unused-vars
const error = (type, msg) => {
  throw new type(msg);
};
