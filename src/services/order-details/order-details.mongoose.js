
/* eslint quotes: 0 */
// Defines Mongoose model for service `orderDetails`. (Can be re-generated.)
const merge = require('lodash.merge')
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose')
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: model
  {
    quantity: {
      type: Number,
      required: true
    },
    value_per_product: {
      type: Number,
      required: true
    },
    value_total: Number,
    product_id: {
      type: Number,
      required: true
    },
    order_id: Number,
    meta_product: String,
    notes: String,
    deletedAt: Date
  },
  // !end
  // !code: moduleExports // !end
)

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
