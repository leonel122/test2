
/* eslint quotes: 0 */
// Defines Mongoose model for service `schedule`. (Can be re-generated.)
const merge = require('lodash.merge')
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose')
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: model
  {
    day: {
      type: String,
      enum: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6"
      ],
      required: true
    },
    shop_id: {
      type: Number,
      required: true
    },
    start_hour: {
      type: String,
      required: true
    },
    end_hour: {
      type: String,
      required: true
    },
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
