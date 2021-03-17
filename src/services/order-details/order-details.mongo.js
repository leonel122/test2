
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `orderDetails`. (Can be re-generated.)
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
      quantity: {
        bsonType: "int"
      },
      value_per_product: {
        bsonType: "number"
      },
      value_total: {
        bsonType: "number"
      },
      product_id: {
        bsonType: "int"
      },
      order_id: {
        bsonType: "int"
      },
      meta_product: {
        bsonType: "string"
      },
      notes: {
        bsonType: "string"
      },
      deletedAt: {
        format: "date-time",
        bsonType: "string"
      }
    },
    required: [
      "quantity",
      "value_per_product",
      "product_id"
    ]
  },
  // !end
  // !code: moduleExports // !end
)

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
