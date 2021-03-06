
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `featuredProducts`. (Can be re-generated.)
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
      product_id: {
        bsonType: "int"
      },
      category_id: {
        bsonType: "int"
      },
      status: {
        enum: [
          "active",
          "inactive"
        ],
        bsonType: "string"
      },
      priority: {
        bsonType: "int"
      },
      backgroundColor: {
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
