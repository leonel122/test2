
// Initializes the `shippingCost` service on path `/shipping-cost`. (Can be re-generated.)
const createService = require('feathers-sequelize')
const createModel = require('../../models/shipping-cost.model')
const hooks = require('./shipping-cost.hooks')
// !code: imports // !end
// !code: init // !end

let moduleExports = function (app) {
  let Model = createModel(app)
  let paginate = app.get('paginate')
  // !code: func_init // !end

  let options = {
    Model,
    paginate,
    // !code: options_more
    multi: true,
    // !end
  }
  // !code: options_change // !end

  // Initialize our service with any options it requires
  // !<DEFAULT> code: extend
  app.use('/shipping-cost', createService(options))
  // !end

  // Get our initialized service so that we can register hooks
  const service = app.service('shipping-cost')

  service.hooks(hooks)
  // !code: func_return // !end
}

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
