
/* eslint quotes: 0 */
// Defines Mongoose model for service `orders`. (Can be re-generated.)
const merge = require('lodash.merge')
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose')
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: model
  {
    shop_id: Number,
    user_id: Number,
    value: Number,
    total_value: Number,
    shipping_cost: Number,
    order_status_id: Number,
    shopping_cart_id: Number,
    delivery_time: String,
    meta_data: String,
    shop_meta_data: String,
    shipping_meta_data: String,
    deletedAt: Date
  },
  // !end
  // !code: moduleExports // !end
)

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
