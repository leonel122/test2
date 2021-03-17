// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {
  checkContext,
  getItems,
  replaceItems,
} = require("feathers-hooks-common");
const { NotAcceptable } = require("@feathersjs/errors");
const lodash = require("lodash");
const orderHistory = require("../../../hooks/order-history");
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
    let records = getItems(context);

    const response = [];
    if (!records.shopping_cart_id)
      throw new NotAcceptable(
        "Debes enviar el identificador del carro de compras."
      );

    const [shopping_cart, address] = await Promise.all([
      context.app
        .service("shopping-cart")
        .find({
          query: { id: records.shopping_cart_id, status: "Active" },
          paginate: false,
        })
        .then((it) => it[0]),
      context.app
        .service("addresses")
        .find({
          query: { id: records.address_id, deletedAt: -1 },
          paginate: false,
        })
        .then((it) => it[0]),
    ]);

    if (!shopping_cart)
      throw new NotAcceptable("No se encontró el carro de compras.");

    if (!address) throw new NotAcceptable("No se encontró la dirección.");

    const shops = lodash.uniq(
      shopping_cart.shopping_cart_details.map((it) => it.product.shop_id)
    );

    const deviceToken = await context.app
      .service("users-devices-tokens")
      .getModel()
      .findOne({ where: { user_id: user.id } });

    const result = {};

    for (let i = 0; i < shops.length; i++) {
      result[shops[i]] = shopping_cart.shopping_cart_details.filter(
        (it) => it.product.shop_id === shops[i]
      );
    }

    let delivery_free = user.delivery_free;
    for (let key in result) {
      let value = 0;
      // let shopping_cart_id = null;

      const [shoppingCost, shop] = await Promise.all([
        context.app
          .service("shipping-cost")
          .getModel()
          .findOne({
            where: {
              shop_id: key,
              locality_id: address.locality_id,
              deletedAt: -1,
            },
          }),
        context.app
          .service("shops")
          .getModel()
          .findOne({
            where: {
              id: key,
              deletedAt: -1,
            },
          }),
      ]);

      const ordersData = {
        user_id: user.id,
        shop_id: parseInt(key),
        shipping_cost: parseFloat(delivery_free >= 1 ? 0 : shoppingCost.price),
        order_status_id: 1,
        shopping_cart_id: records.shopping_cart_id,
        delivery_time: `${shoppingCost.quantity_time} ${shoppingCost.unit_time}`,
        shop_meta_data: JSON.stringify(shop),
        meta_data: JSON.stringify({
          user: user,
          shopping_cost: shoppingCost,
          address: address,
        }),
        shipping_meta_data: JSON.stringify(shoppingCost),
        deletedAt: -1,
      };

      const order = await context.app.service("orders").create(ordersData);

      await orderHistory({ order_id: order.id, order_status_id: 1 })(context);

      await Promise.all([
        context.app.service("notifications").create({
          type: "notification",
          typeNotification: "buyShop",
          phone: shop.phone,
        }),
        context.app.service("notifications").create({
          type: "notification",
          typeNotification: "buyShopUser",
          phone: user.phone,
          shop_name: shop.name,
          device_token: deviceToken ? deviceToken.firebase_token : null,
          id: order.id,
        }),
      ]);

      // response.push();
      for (let i = 0; i < result[key].length; i++) {
        const shoppingCartDetails = result[key][i];
        // value += shoppingCartDetails.product.value;
        ordersData.shopping_cart_id = shoppingCartDetails.shopping_cart_id;

        const product_ids = [];
        product_ids.push(shoppingCartDetails.product.id);

        const orderDetails = {
          quantity: shoppingCartDetails.quantity,
          value_per_product: shoppingCartDetails.product.value,
          product_id: shoppingCartDetails.product.id,
          order_id: order.id,
          meta_product: JSON.stringify(shoppingCartDetails.product),
          notes: shoppingCartDetails.notes,
          deletedAt: -1,
          value_total:
            shoppingCartDetails.quantity * shoppingCartDetails.product.value,
        };

        await Promise.all([
          context.app.service("order-details").create(orderDetails),
        ]);

        const sumOrder = await context.app
          .service("order-details")
          .getModel()
          .sum("value_total", {
            where: { order_id: orderDetails.order_id },
          })
          .then((sum) => sum);

        await context.app.service("orders").patch(orderDetails.order_id, {
          value: sumOrder,
          total_value:
            parseFloat(delivery_free >= 1 ? 0 : shoppingCost.price) + sumOrder,
        });
      }
      delivery_free ? delivery_free-- : null;
    }

    await Promise.all([
      context.app
        .service("shopping-cart")
        .patch(shopping_cart.id, { status: "Completed" }),
      context.app
        .service("users")
        .patch(user.id, { delivery_free: delivery_free }),
    ]);

    context.result = [...response];

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
