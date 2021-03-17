
/* eslint quotes: 0 */
// Defines Mongoose model for service `cms`. (Can be re-generated.)
const merge = require('lodash.merge')
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose')
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: model
  {
    key: {
      type: String,
      maxLength: 255,
      required: true,
      unique: true
    },
    title: {
      type: String,
      maxLength: 255,
      required: true
    },
    body: {
      type: String,
      required: true
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
