
/* eslint quotes: 0 */
// Defines Mongoose model for service `shops`. (Can be re-generated.)
const merge = require('lodash.merge')
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose')
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: model
  {
    name: {
      type: String,
      maxLength: 255,
      required: true
    },
    nit: {
      type: String,
      maxLength: 255
    },
    user_id: {
      type: Number,
      required: true
    },
    category_id: {
      type: Number,
      required: true
    },
    person_type: {
      type: String,
      enum: [
        "legal",
        "natural"
      ]
    },
    full_name: {
      type: String,
      maxLength: 255
    },
    document_type: {
      type: String,
      enum: [
        "CC",
        "CE",
        "PPN",
        "NIT"
      ]
    },
    status: {
      type: String,
      enum: [
        "Activa",
        "Desactivada",
        "Bloqueada"
      ]
    },
    address: {
      type: String,
      maxLength: 255
    },
    opening_time: String,
    closing_time: String,
    long: {
      type: String,
      maxLength: 255
    },
    lat: {
      type: String,
      maxLength: 255
    },
    logo: String,
    phone: {
      type: String,
      maxLength: 255
    },
    link_facebook: String,
    link_instagram: String,
    quantity_time_preparation: Number,
    type_time_preparation: {
      type: String,
      enum: [
        "minutes",
        "hours"
      ]
    },
    current_status: {
      type: String,
      enum: [
        "open",
        "close"
      ]
    },
    schedule_description: String,
    whatsapp: String,
    priority: Number,
    deletedAt: Date
  },
  // !end
  // !code: moduleExports // !end
)

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
