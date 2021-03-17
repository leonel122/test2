
/* eslint quotes: 0 */
// Defines Mongoose model for service `banners`. (Can be re-generated.)
const merge = require('lodash.merge')
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose')
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: model
  {
    location: {
      type: String,
      enum: [
        "home"
      ],
      required: true
    },
    date: Date,
    start_hour: String,
    end_hour: String,
    destination_id: {
      type: Number,
      required: true
    },
    destination_location: {
      type: String,
      enum: [
        "product",
        "shop",
        "register_shop"
      ],
      required: true
    },
    priority: {
      type: Number,
      required: true
    },
    path: String,
    status: {
      type: String,
      enum: [
        "active",
        "inactive"
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
