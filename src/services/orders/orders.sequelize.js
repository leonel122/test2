
/* eslint quotes: 0 */
// Defines Sequelize model for service `orders`. (Can be re-generated.)
const merge = require('lodash.merge')
const Sequelize = require('sequelize')
// eslint-disable-next-line no-unused-vars
const DataTypes = Sequelize.DataTypes
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: sequelize_model
  {
    shop_id: {
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    value: {
      type: DataTypes.REAL
    },
    total_value: {
      type: DataTypes.REAL
    },
    shipping_cost: {
      type: DataTypes.REAL
    },
    order_status_id: {
      type: DataTypes.INTEGER
    },
    shopping_cart_id: {
      type: DataTypes.INTEGER
    },
    delivery_time: {
      type: DataTypes.TEXT
    },
    meta_data: {
      type: DataTypes.TEXT
    },
    shop_meta_data: {
      type: DataTypes.TEXT
    },
    shipping_meta_data: {
      type: DataTypes.TEXT
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
