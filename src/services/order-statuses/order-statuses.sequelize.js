
/* eslint quotes: 0 */
// Defines Sequelize model for service `orderStatuses`. (Can be re-generated.)
const merge = require('lodash.merge')
const Sequelize = require('sequelize')
// eslint-disable-next-line no-unused-vars
const DataTypes = Sequelize.DataTypes
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: sequelize_model
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    short_description: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
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
