// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { NotAcceptable } = require("@feathersjs/errors");
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
    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    const records = getItems(context);

    records.status = "pending";

    if (
      !records.first_name ||
      !records.last_name ||
      !records.email ||
      !records.phone ||
      !records.password
      //   !records.shop_name
      //   // !records.nitRut ||
      //   // !records.address
    )
      throw new NotAcceptable("Debes llenar todos los campos.");

    const currentUser = await context.app
      .service("users")
      .getModel()
      .findOne({
        where: { $or: [{ email: records.email }, { phone: records.phone }] },
      });

    if (currentUser)
      throw new NotAcceptable(
        "EL telefono o email ya se encuentran registrados."
      );

    const user = await context.app.service("users").create({
      first_name: records.first_name,
      last_name: records.last_name,
      phone: records.phone,
      password: records.password,
      email: records.email,
      status: "active",
      delivery_free: 1,
      role: "user",
    });

    const shop = await context.app.service("shops").create({
      user_id: user.id,
      name: records.shop_name ? records.shop_name : "Nombre de la tienda",
      category_id: records.category_id,
      phone: records.phone,
      address: records.address,
      nit: records.nitRut,
      full_name: `${records.first_name} ${records.last_name}`,
      whatsapp: user.phone,
      person_type: "natural",
      document_type: "CC",
      schedule_description: "Lun - Dom : 8am - 8pm",
    });

    await context.app.service("notifications").create({
      type: "notification",
      shop,
      typeNotification: "newShop",
      phone: records.phone,
    });

    records.owner_name = `${records.first_name} ${records.last_name}`;

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
