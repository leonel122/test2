const { checkContext, getItems } = require("feathers-hooks-common");
const moment = require("moment");
module.exports = function (options = {}) {
  return async (context) => {
    checkContext(context, null, [
      "find",
      "get",
      "create",
      "update",
      "patch",
      "remove",
    ]);

    const records = getItems(context);

    const { user } = context.params;

    if (!user) {
      const userDeviceToken = await context.app
        .service("users-devices-tokens")
        .getModel()
        .findOne({
          where: {
            firebase_token: records.firebase_token,
            ip: records.ip ? records.ip : `${context.params.ip}`,
          },
        });

      if (userDeviceToken) {
        context.result = [{}];
      }

      records.ip = records.ip ? records.ip : `${context.params.ip}`;
    } else {
      const userDeviceToken = await context.app
        .service("users-devices-tokens")
        .getModel()
        .findOne({
          where: {
            ip: records.ip ? records.ip : `${context.params.ip}`,
            user_id: null,
          },
        });

      if (userDeviceToken) {
        await context.app
          .service("users-devices-tokens")
          .getModel()
          .destroy({
            where: { user_id: user.id, id: { $not: userDeviceToken.id } },
          });

        await context.app
          .service("users-devices-tokens")
          .getModel()
          .update({ user_id: user.id }, { where: { id: userDeviceToken.id } });
      }

      context.result = [{}];
    }

    return context;
  };
};

function error(msg) {
  throw new Error(msg);
}
