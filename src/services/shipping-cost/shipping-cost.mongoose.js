
/* eslint quotes: 0 */
// Defines Mongoose model for service `shippingCost`. (Can be re-generated.)
const merge = require('lodash.merge')
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose')
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: model
  {
    locality_id: {
      type: Number,
      required: true
    },
    shop_id: {
      type: Number,
      required: true
    },
    price: {
      type: String,
      maxLength: 255,
      required: true
    },
    quantity_time: Number,
    unit_time: {
      type: String,
      enum: [
        "hours",
        "days"
      ]
    },
    deletedAt: Date
  },
  // !end
  // !code: moduleExports // !end
)

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
