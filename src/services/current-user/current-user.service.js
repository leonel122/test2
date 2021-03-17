
// Initializes the `currentUser` service on path `/current-user`. (Can be re-generated.)
const createService = require('./current-user.class')
const hooks = require('./current-user.hooks')
// !code: imports // !end
// !code: init // !end

let moduleExports = function (app) {

  let paginate = app.get('paginate')
  // !code: func_init // !end

  let options = {
    paginate,
    // !code: options_more // !end
  }
  // !code: options_change // !end

  // Initialize our service with any options it requires
  // !<DEFAULT> code: extend
  app.use('/current-user', createService(options))
  // !end

  // Get our initialized service so that we can register hooks
  const service = app.service('current-user')

  service.hooks(hooks)
  // !code: func_return // !end
}

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
