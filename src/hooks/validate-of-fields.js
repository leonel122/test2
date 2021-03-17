// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {
  checkContext,
  getItems,
  replaceItems,
} = require("feathers-hooks-common");
const { NotAcceptable } = require("@feathersjs/errors");
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
    // const errors = [];
    // throw ''
    let fields = [];
    if (context.path == "products" && context.method == "create") {
      fields = [
        { field: records.name, fieldName: "Nombre" },
        // { field: records.unit_measure_id, fieldName: 'Unidad de medida' },
        { field: records.value, fieldName: "Precio" },
        // { field: records.category_id, fieldName: "Categoria" },
        // { field: records.quantity, fieldName: "Cantidad" },
        { field: records.description, fieldName: "Descripción" },
        // { field: records.preparation_time, fieldName: "Tiempo de preparación" },

        // { field: records.bran, fieldName: 'Marca' }
      ];
    }

    fields.map((field) => {
      if (!field.field)
        throw new NotAcceptable(`El campo ${field.fieldName} es requerido`);
    });
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
