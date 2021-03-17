
/* eslint quotes: 0 */
// Defines Sequelize model for service `shoppingCart`. (Can be re-generated.)
const merge = require('lodash.merge')
const Sequelize = require('sequelize')
// eslint-disable-next-line no-unused-vars
const DataTypes = Sequelize.DataTypes
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: sequelize_model
  {
    user_id: {
      type: DataTypes.INTEGER
    },
    token: {
      type: DataTypes.TEXT
    },
    status: {
      type: Sequelize.ENUM(["Active","Inactive","Completed"])
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  },
  // !end
  // !code: moduleExports // !end
)

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
