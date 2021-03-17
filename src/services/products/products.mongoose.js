
/* eslint quotes: 0 */
// Defines Mongoose model for service `products`. (Can be re-generated.)
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
    units: {
      type: String,
      maxLength: 255
    },
    unit_measure_id: Number,
    value: {
      type: Number,
      required: true
    },
    category_id: Number,
    shop_id: Number,
    quantity: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      maxLength: 255
    },
    discount: Number,
    status: {
      type: String,
      enum: [
        "active",
        "inactive"
      ],
      required: true
    },
    short_description: String,
    image: String,
    deletedAt: Date
  },
  // !end
  // !code: moduleExports // !end
)

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
