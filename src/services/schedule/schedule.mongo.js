
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `schedule`. (Can be re-generated.)
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
      day: {
        enum: [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6"
        ],
        bsonType: "string"
      },
      shop_id: {
        bsonType: "int"
      },
      start_hour: {
        format: "time",
        bsonType: "string"
      },
      end_hour: {
        format: "time",
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
      "day",
      "shop_id",
      "start_hour",
      "end_hour"
    ]
  },
  // !end
  // !code: moduleExports // !end
)

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
