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

    const [orderUser, shop] = await Promise.all([
      context.app
        .service("users")
        .getModel()
        .findOne({
          attributes: ["phone"],
          where: {
            id: records.user_id,
          },
        }),
      context.app
        .service("shops")
        .getModel()
        .findOne({
          attributes: ["name"],
          where: {
            id: records.shop_id,
          },
        }),
    ]);

    if (records.order_status_id == 2) {
      await context.app.service("notifications").create({
        type: "notification",
        shop,
        typeNotification: "orderAcepted",
        phone: orderUser.phone,
        id: records.id,
      });

      const ordersDetails = await context.app
        .service("order-details")
        .getModel()
        .findAll({
          attributes: ["id", "product_id", "quantity"],
          where: { order_id: records.id },
        });

      for (const key in ordersDetails) {
        const ordersDetail = ordersDetails[key];
        await context.app
          .service("products")
          .getModel()
          .decrement(
            { quantity: ordersDetail.quantity },
            {
              where: { id: ordersDetail.product_id },
            }
          );
      }
    } else if (records.order_status_id == 3) {
      await context.app.service("notifications").create({
        type: "notification",
        shop,
        typeNotification: "orderSend",
        phone: orderUser.phone,
        id: records.id,
      });
    } else if (records.order_status_id == 4) {
      await context.app.service("notifications").create({
        type: "notification",
        shop,
        typeNotification: "orderRejected",
        phone: orderUser.phone,
        id: records.id,
      });
    } else if (records.order_status_id == 5) {
      await context.app.service("notifications").create({
        type: "notification",
        shop,
        typeNotification: "orderDelivered",
        phone: orderUser.phone,
        id: records.id,
      });
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
