
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `shoppingCartDetails`. (Can be re-generated.)
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
      shopping_cart_id: {
        bsonType: "int"
      },
      product_id: {
        bsonType: "int"
      },
      quantity: {
        bsonType: "int"
      },
      shop_id: {
        bsonType: "int"
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
