// Configure middleware. (Can be re-generated.)
// !code: imports
const awsS3 = require("./aws-s3");

// !end
// !code: init
const getIp = require("./getIp");
// !end

// eslint-disable-next-line no-unused-vars
let moduleExports = function (app) {
  // !code: func_init // !end
  // Add your custom middleware here. Remember that
  // in Express, the order matters.
  // !code: middleware
  app.use("/s3Client", awsS3());
  app.use(getIp());
  // !end
  // !code: func_return // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
