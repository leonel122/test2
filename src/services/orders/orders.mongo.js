
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `orders`. (Can be re-generated.)
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
      user_id: {
        bsonType: "int"
      },
      value: {
        bsonType: "number"
      },
      total_value: {
        bsonType: "number"
      },
      shipping_cost: {
        bsonType: "number"
      },
      order_status_id: {
        bsonType: "int"
      },
      shopping_cart_id: {
        bsonType: "int"
      },
      delivery_time: {
        bsonType: "string"
      },
      meta_data: {
        bsonType: "string"
      },
      shop_meta_data: {
        bsonType: "string"
      },
      shipping_meta_data: {
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
