
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `cms`. (Can be re-generated.)
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
      key: {
        maxLength: 255,
        bsonType: "string"
      },
      title: {
        maxLength: 255,
        bsonType: "string"
      },
      body: {
        bsonType: "string"
      },
      deletedAt: {
        format: "date-time",
        bsonType: "string"
      }
    },
    required: [
      "key",
      "title",
      "body"
    ]
  },
  // !end
  // !code: moduleExports // !end
)

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
