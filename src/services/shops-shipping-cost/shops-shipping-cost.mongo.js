
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `shopsShippingCost`. (Can be re-generated.)
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
      shop_id: {
        bsonType: "int"
      },
      value: {
        bsonType: "number"
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
