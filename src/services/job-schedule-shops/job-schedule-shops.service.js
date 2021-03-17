
// Initializes the `jobScheduleShops` service on path `/job-schedule-shops`. (Can be re-generated.)
const createService = require('./job-schedule-shops.class')
const hooks = require('./job-schedule-shops.hooks')
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
  app.use('/job-schedule-shops', createService(options))
  // !end

  // Get our initialized service so that we can register hooks
  const service = app.service('job-schedule-shops')

  service.hooks(hooks)
  // !code: func_return // !end
}

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
