
/* eslint quotes: 0 */
// Defines Mongoose model for service `shopRegisterContact`. (Can be re-generated.)
const merge = require('lodash.merge')
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose')
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: model
  {
    shop_name: {
      type: String,
      maxLength: 255
    },
    address: {
      type: String,
      maxLength: 255,
      required: true
    },
    phone: {
      type: String,
      maxLength: 255,
      required: true
    },
    email: {
      type: String,
      maxLength: 255,
      required: true
    },
    owner_name: {
      type: String,
      maxLength: 255,
      required: true
    },
    status: {
      type: String,
      enum: [
        "pending",
        "register",
        "rejected"
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
