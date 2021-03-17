
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `addresses`. (Can be re-generated.)
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
      locality_id: {
        bsonType: "int"
      },
      user_id: {
        bsonType: "int"
      },
      address: {
        maxLength: 255,
        bsonType: "string"
      },
      notes: {
        bsonType: "string"
      },
      main: {
        enum: [
          "true",
          "false"
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
      "user_id",
      "name",
      "address"
    ]
  },
  // !end
  // !code: moduleExports // !end
)

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
