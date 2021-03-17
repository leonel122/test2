
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { checkContext, getItems, replaceItems } = require('feathers-hooks-common')
const { NotAcceptable, NotFound } = require('@feathersjs/errors')
// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {

  // Return the actual hook.
  return async (context) => {
    // Throw if the hook is being called from an unexpected location.
    checkContext(context, null, ['find', 'get', 'create', 'update', 'patch', 'remove'])

    // Get the authenticated user.
    // eslint-disable-next-line no-unused-vars
    const { user } = context.params
    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    const records = getItems(context)

    if (user.role == 'admin') return context

    const shop = await context.app.service('shops')
      .find({ query: { user_id: user.id, id: records.shop_id ? records.shop_id : 0 }, paginate: false })
      .then(it => it[0])

    if (!shop) throw new NotFound('No se encontró la tienda.')

    if (!records.value) throw new NotAcceptable('Debes enviar el valor.')

    const shopShippingCost = await context.app.service('shops-shipping-cost')
      .find({ query: { shop_id: records.shop_id }, paginate: false })
      .then(it => it[0])

    if (shopShippingCost) throw new NotAcceptable('Ya tienes configurada un valor de envio.')

    records.shop_id = shop.id
    // Place the modified records back in the context.
    replaceItems(context, records)
    // Best practice: hooks should always return the context.
    return context
  }
}

// Throw on unrecoverable error.
// eslint-disable-next-line no-unused-vars
function error(msg) {
  throw new Error(msg)
}
