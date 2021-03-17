
/* eslint quotes: 0 */
// Defines Sequelize model for service `users`. (Can be re-generated.)
const merge = require('lodash.merge')
const Sequelize = require('sequelize')
// eslint-disable-next-line no-unused-vars
const DataTypes = Sequelize.DataTypes
// !code: imports // !end
// !code: init // !end

// Your model may need the following fields:
//   email:      { type: DataTypes.STRING, allowNull: false, unique: true },
//   password:   { type: DataTypes.STRING, allowNull: false },
let moduleExports = merge({},
  // !code: sequelize_model
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.ENUM(["admin","user"])
    },
    permissions: {
      type: DataTypes.TEXT
    },
    status: {
      type: Sequelize.ENUM(["active","inactive"])
    },
    avatar: {
      type: DataTypes.TEXT
    },
    token_reset_password: {
      type: DataTypes.INTEGER
    },
    token: {
      type: DataTypes.INTEGER
    },
    delivery_free: {
      type: DataTypes.INTEGER
    },
    token_reminder:{
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
