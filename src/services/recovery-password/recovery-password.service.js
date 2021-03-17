
// Initializes the `recoveryPassword` service on path `/recovery-password`. (Can be re-generated.)
const createService = require('./recovery-password.class')
const hooks = require('./recovery-password.hooks')
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
  app.use('/recovery-password', createService(options))
  // !end

  // Get our initialized service so that we can register hooks
  const service = app.service('recovery-password')

  service.hooks(hooks)
  // !code: func_return // !end
}

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
