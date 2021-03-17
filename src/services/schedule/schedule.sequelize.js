
/* eslint quotes: 0 */
// Defines Sequelize model for service `schedule`. (Can be re-generated.)
const merge = require('lodash.merge')
const Sequelize = require('sequelize')
// eslint-disable-next-line no-unused-vars
const DataTypes = Sequelize.DataTypes
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !code: sequelize_model
  {
    day: {
      type: Sequelize.ENUM(["0", "1", "2", "3", "4", "5", "6"]),
      allowNull: false,
    },
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_hour: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_hour: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM(["active", "inactive"]),
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  }
  // !end
  // !code: moduleExports // !end
)

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
