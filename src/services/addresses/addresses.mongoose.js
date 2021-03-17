
/* eslint quotes: 0 */
// Defines Mongoose model for service `addresses`. (Can be re-generated.)
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
    locality_id: {
      type: Number,
      required: true
    },
    user_id: {
      type: Number,
      required: true
    },
    address: {
      type: String,
      maxLength: 255,
      required: true
    },
    notes: String,
    main: {
      type: String,
      enum: [
        "true",
        "false"
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
