
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `products`. (Can be re-generated.)
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
      name: {
        maxLength: 255,
        bsonType: "string"
      },
      units: {
        maxLength: 255,
        bsonType: "string"
      },
      unit_measure_id: {
        bsonType: "int"
      },
      value: {
        bsonType: "number"
      },
      category_id: {
        bsonType: "int"
      },
      shop_id: {
        bsonType: "int"
      },
      quantity: {
        bsonType: "int"
      },
      description: {
        bsonType: "string"
      },
      brand: {
        maxLength: 255,
        bsonType: "string"
      },
      discount: {
        bsonType: "number"
      },
      status: {
        enum: [
          "active",
          "inactive"
        ],
        bsonType: "string"
      },
      short_description: {
        bsonType: "string"
      },
      image: {
        bsonType: "string"
      },
      deletedAt: {
        format: "date-time",
        bsonType: "string"
      }
    },
    required: [
      "status",
      "value",
      "name",
      "description",
      "quantity"
    ]
  },
  // !end
  // !code: moduleExports // !end
)

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
