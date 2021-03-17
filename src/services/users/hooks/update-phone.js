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
      const { user } = context.params;
      // Get the record(s) from context.data (before), context.result.data or context.result (after).
      // getItems always returns an array to simplify your processing.
      const records = getItems(context);
  
      console.log(records)
     if(records.phone){
         const currentUser = await context.app.service("users").getModel().findOne({where:{phone:records.phone}})

         if(currentUser && currentUser.id != user.id) throw new NotAcceptable("Ya existe el telefono.")

         context.sendToken = "true"
     }
  
      // Place the modified records back in the context.
      replaceItems(context, records);
      // Best practice: hooks should always return the context.
      return context;
    };
  };
  
  // Throw to reject the service call, or on an unrecoverable error.
  // eslint-disable-next-line no-unused-vars
  function error(msg) {
    throw new Error(msg);
  }
  