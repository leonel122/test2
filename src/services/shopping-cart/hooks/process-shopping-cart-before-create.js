// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {
  checkContext,
  getItems,
  replaceItems,
} = require("feathers-hooks-common");
const { NotAcceptable, NotFound, Forbidden } = require("@feathersjs/errors");
const generate = require("nanoid/async/generate");
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
    const app = context.app;

    if (!records.token) throw new NotAcceptable("Debe enviar el token.");

    const shoppingCart = await app
      .service("shopping-cart")
      .find({
        query: { token: records.token, status: "Active" },
        paginate: false,
      })
      .then((it) => it[0]);

    if (!records)
      throw new NotAcceptable(
        "Debes enviar al menos un item para poder crear el carro de compras"
      );

    const product = await context.app
      .service("products")
      .find({
        query: { id: records.product_id },
        paginate: false,
      })
      .then((it) => it[0]);

    if (!product) throw new NotFound("No se encontro el producto enviado");

    const shop = await context.app
      .service("shops")
      .getModel()
      .findOne({ where: { id: product.shop_id, deletedAt: -1 } });

    if (records.quantity < 1)
      throw new NotAcceptable(
        `La cantidad debe ser mayor a uno producto ${product.name}.`
      );

    // if (product.quantity <= 0)
    //   throw new NotAcceptable(
    //     "No hay stock en para este producto por el momento."
    //   );

    // if (records.quantity > product.quantity)
    //   throw new NotAcceptable(
    //     "No hay suficiente stock para este producto por el momento."
    //   );

    let shoppingCarDetailsSwicth = true;
    if (shoppingCart) {
      const shopping_cart_details = await context.app
        .service("shopping-cart-details")
        .find({
          query: {
            product_id: records.product_id,
            shopping_cart_id: shoppingCart.id,
            deletedAt: -1,
          },
          paginate: false,
        })
        .then((it) => it[0]);

      shoppingCarDetailsSwicth = false;
      if (shopping_cart_details) {
        await context.app
          .service("shopping-cart-details")
          .patch(shopping_cart_details.id, {
            quantity: records.quantity,
            notes: records.notes,
          });
      } else {
        const data = {
          product_id: records.product_id,
          shopping_cart_id: shoppingCart.id,
          shop_id: product.shop_id,
          quantity: records.quantity,
          notes: records.notes,
          deletedAt: -1,
        };

        // console.log("---------------");
        await app.service("shopping-cart-details").create(data);
      }

      context.result = [records];
    }

    // records.user_id = user.id;
    records.status = "Active";

    context.notes = records.notes;
    context.shoppingCarDetailsSwicth = shoppingCarDetailsSwicth;
    context.shopping_cart_details = records;
    context.product = product;
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
