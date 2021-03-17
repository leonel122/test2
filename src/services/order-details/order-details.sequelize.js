
/* eslint quotes: 0 */
// Defines Sequelize model for service `orderDetails`. (Can be re-generated.)
const merge = require('lodash.merge')
const Sequelize = require('sequelize')
// eslint-disable-next-line no-unused-vars
const DataTypes = Sequelize.DataTypes
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: sequelize_model
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    value_per_product: {
      type: DataTypes.REAL,
      allowNull: false
    },
    value_total: {
      type: DataTypes.REAL
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order_id: {
      type: DataTypes.INTEGER
    },
    meta_product: {
      type: DataTypes.TEXT
    },
    notes: {
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
