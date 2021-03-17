
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `users`. (Can be re-generated.)
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
      first_name: {
        maxLength: 255,
        bsonType: "string"
      },
      last_name: {
        maxLength: 255,
        bsonType: "string"
      },
      email: {
        maxLength: 255,
        bsonType: "string"
      },
      phone: {
        maxLength: 255,
        bsonType: "string"
      },
      password: {
        maxLength: 255,
        bsonType: "string"
      },
      role: {
        enum: [
          "admin",
          "user"
        ],
        bsonType: "string"
      },
      permissions: {
        bsonType: "string"
      },
      status: {
        enum: [
          "active",
          "inactive"
        ],
        bsonType: "string"
      },
      avatar: {
        bsonType: "string"
      },
      token_reset_password: {
        bsonType: "int"
      },
      deletedAt: {
        format: "date-time",
        bsonType: "string"
      }
    },
    required: [
      "first_name",
      "last_name",
      "phone",
      "password"
    ]
  },
  // !end
  // !code: moduleExports // !end
)

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
