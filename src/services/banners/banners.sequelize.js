
/* eslint quotes: 0 */
// Defines Sequelize model for service `banners`. (Can be re-generated.)
const merge = require('lodash.merge')
const Sequelize = require('sequelize')
// eslint-disable-next-line no-unused-vars
const DataTypes = Sequelize.DataTypes
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: sequelize_model
  {
    location: {
      type: Sequelize.ENUM(["home"]),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE
    },
    start_hour: {
      type: DataTypes.TEXT
    },
    end_hour: {
      type: DataTypes.TEXT
    },
    destination_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    destination_location: {
      type: Sequelize.ENUM(["product","shop","register_shop"]),
      allowNull: false
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    path: {
      type: DataTypes.TEXT
    },
    status: {
      type: Sequelize.ENUM(["active","inactive"])
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
