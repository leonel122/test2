
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `shoppingCart`. (Can be re-generated.)
const merge = require('lodash.merge')
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: model
  {
    bsonType: "object",
    additionalProperties: false,
    properties: {
      _id: {
        bsonType: "objectId"
      },
      user_id: {
        bsonType: "int"
      },
      token: {
        bsonType: "string"
      },
      status: {
        enum: [
          "Active",
          "Inactive",
          "Completed"
        ],
        bsonType: "string"
      },
      deletedAt: {
        format: "date-time",
        bsonType: "string"
      }
    }
  },
  // !end
  // !code: moduleExports // !end
)

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
