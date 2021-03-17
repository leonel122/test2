
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `banners`. (Can be re-generated.)
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
      location: {
        enum: [
          "home"
        ],
        bsonType: "string"
      },
      date: {
        format: "date-time",
        bsonType: "string"
      },
      start_hour: {
        format: "time",
        bsonType: "string"
      },
      end_hour: {
        format: "time",
        bsonType: "string"
      },
      destination_id: {
        bsonType: "int"
      },
      destination_location: {
        enum: [
          "product",
          "shop",
          "register_shop"
        ],
        bsonType: "string"
      },
      priority: {
        bsonType: "int"
      },
      path: {
        bsonType: "string"
      },
      status: {
        enum: [
          "active",
          "inactive"
        ],
        bsonType: "string"
      },
      deletedAt: {
        format: "date-time",
        bsonType: "string"
      }
    },
    required: [
      "location",
      "destination_id",
      "destination_location",
      "priority"
    ]
  },
  // !end
  // !code: moduleExports // !end
)

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
