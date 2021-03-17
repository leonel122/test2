
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `shops`. (Can be re-generated.)
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
      nit: {
        maxLength: 255,
        bsonType: "string"
      },
      user_id: {
        bsonType: "int"
      },
      category_id: {
        bsonType: "int"
      },
      person_type: {
        enum: [
          "legal",
          "natural"
        ],
        bsonType: "string"
      },
      full_name: {
        maxLength: 255,
        bsonType: "string"
      },
      document_type: {
        enum: [
          "CC",
          "CE",
          "PPN",
          "NIT"
        ],
        bsonType: "string"
      },
      status: {
        enum: [
          "Activa",
          "Desactivada",
          "Bloqueada"
        ],
        bsonType: "string"
      },
      address: {
        maxLength: 255,
        bsonType: "string"
      },
      opening_time: {
        format: "time",
        bsonType: "string"
      },
      closing_time: {
        format: "time",
        bsonType: "string"
      },
      long: {
        maxLength: 255,
        bsonType: "string"
      },
      lat: {
        maxLength: 255,
        bsonType: "string"
      },
      logo: {
        bsonType: "string"
      },
      phone: {
        maxLength: 255,
        bsonType: "string"
      },
      link_facebook: {
        bsonType: "string"
      },
      link_instagram: {
        bsonType: "string"
      },
      quantity_time_preparation: {
        bsonType: "number"
      },
      type_time_preparation: {
        enum: [
          "minutes",
          "hours"
        ],
        bsonType: "string"
      },
      current_status: {
        enum: [
          "open",
          "close"
        ],
        bsonType: "string"
      },
      schedule_description: {
        bsonType: "string"
      },
      whatsapp: {
        bsonType: "string"
      },
      priority: {
        bsonType: "int"
      },
      deletedAt: {
        format: "date-time",
        bsonType: "string"
      }
    },
    required: [
      "name",
      "user_id",
      "category_id"
    ]
  },
  // !end
  // !code: moduleExports // !end
)

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
