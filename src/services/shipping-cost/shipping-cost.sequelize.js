
/* eslint quotes: 0 */
// Defines Sequelize model for service `shippingCost`. (Can be re-generated.)
const merge = require('lodash.merge')
const Sequelize = require('sequelize')
// eslint-disable-next-line no-unused-vars
const DataTypes = Sequelize.DataTypes
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: sequelize_model
  {
    locality_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity_time: {
      type: DataTypes.INTEGER
    },
    unit_time: {
      type: Sequelize.ENUM(["hours","days"])
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
