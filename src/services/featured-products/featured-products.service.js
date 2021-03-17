
// Initializes the `featuredProducts` service on path `/featured-products`. (Can be re-generated.)
const createService = require('feathers-sequelize')
const createModel = require('../../models/featured-products.model')
const hooks = require('./featured-products.hooks')
// !code: imports // !end
// !code: init // !end

let moduleExports = function (app) {
  let Model = createModel(app)
  let paginate = app.get('paginate')
  // !code: func_init // !end

  let options = {
    Model,
    paginate,
    // !code: options_more // !end
  }
  // !code: options_change // !end

  // Initialize our service with any options it requires
  // !<DEFAULT> code: extend
  app.use('/featured-products', createService(options))
  // !end

  // Get our initialized service so that we can register hooks
  const service = app.service('featured-products')

  service.hooks(hooks)
  // !code: func_return // !end
}

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
