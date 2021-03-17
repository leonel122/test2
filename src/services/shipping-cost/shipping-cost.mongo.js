
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `shippingCost`. (Can be re-generated.)
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
      locality_id: {
        bsonType: "int"
      },
      shop_id: {
        bsonType: "int"
      },
      price: {
        maxLength: 255,
        bsonType: "string"
      },
      quantity_time: {
        bsonType: "int"
      },
      unit_time: {
        enum: [
          "hours",
          "days"
        ],
        bsonType: "string"
      },
      deletedAt: {
        format: "date-time",
        bsonType: "string"
      }
    },
    required: [
      "locality_id",
      "shop_id",
      "price"
    ]
  },
  // !end
  // !code: moduleExports // !end
)

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
