// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {
  checkContext,
  getItems,
  replaceItems,
} = require("feathers-hooks-common");
const generate = require("nanoid/generate");
const errors = require("@feathersjs/errors");

module.exports = function (options = {}) {
  // Return the actual hook.
  return async (context) => {
    // Throw if the hook is being called from an unexpected location.

    checkContext(context, null, ["create"]);

    // Get the authenticated user.

    // const { user } = context.params;
    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    const records = getItems(context);

    if (records.phone) {
      //generamos el token
      const rand = function () {
        return Math.random().toString(36).substr(2); // remove `0.`
      };
      const token = function () {
        return rand() + rand(); // to make it longer
      };

      const user = await context.app
        .service("users")
        .getModel()
        .findOne({ where: { phone: records.phone } });

      if (user) {
        const token = generate("1234567890", 4);
        user.token_reset_password = token;
        user.save();
        console.log(user, "USERRRRRS");

        await context.app.service("notifications").create({
          type: "notification",
          typeNotification: "recoveryPassword",
          phone: records.phone,
          token,
        });

        //ENVIAR MENSAGE DE TEXTO
      } else {
        throw new errors.NotFound("Email does not exist");
      }
    }

    /*
        Modify records and/or context.
         */

    // Place the modified records back in the context.
    replaceItems(context, records);
    // Best practice: hooks should always return the context.
    return context;
  };
};

// Throw on unrecoverable error.

function error(msg) {
  throw new Error(msg);
}
