
// Initializes the `productsImages` service on path `/products-images`. (Can be re-generated.)
const createService = require('feathers-sequelize')
const createModel = require('../../models/products-images.model')
const hooks = require('./products-images.hooks')
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
  app.use('/products-images', createService(options))
  // !end

  // Get our initialized service so that we can register hooks
  const service = app.service('products-images')

  service.hooks(hooks)
  // !code: func_return // !end
}

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
