
/* eslint quotes: 0 */
// Defines Mongoose model for service `users`. (Can be re-generated.)
const merge = require('lodash.merge')
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose')
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: model
  {
    first_name: {
      type: String,
      maxLength: 255,
      required: true
    },
    last_name: {
      type: String,
      maxLength: 255,
      required: true
    },
    email: {
      type: String,
      maxLength: 255,
      unique: true
    },
    phone: {
      type: String,
      maxLength: 255,
      required: true,
      unique: true
    },
    password: {
      type: String,
      maxLength: 255,
      required: true
    },
    role: {
      type: String,
      enum: [
        "admin",
        "user"
      ]
    },
    permissions: String,
    status: {
      type: String,
      enum: [
        "active",
        "inactive"
      ]
    },
    avatar: String,
    token_reset_password: Number,
    deletedAt: Date
  },
  // !end
  // !code: moduleExports // !end
)

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
