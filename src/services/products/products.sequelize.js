/* eslint quotes: 0 */
// Defines Sequelize model for service `products`. (Can be re-generated.)
const merge = require("lodash.merge");
const Sequelize = require("sequelize");
// eslint-disable-next-line no-unused-vars
const DataTypes = Sequelize.DataTypes;
// !code: imports // !end
// !code: init // !end

let moduleExports = merge(
  {},
  // !<DEFAULT> code: sequelize_model
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    units: {
      type: DataTypes.STRING,
    },
    unit_measure_id: {
      type: DataTypes.INTEGER,
    },
    value: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
    },
    shop_id: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
    },
    discount: {
      type: DataTypes.REAL,
    },
    status: {
      type: Sequelize.ENUM(["active", "inactive"]),
      allowNull: false,
    },
    short_description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.TEXT,
    },
    priority: {
      type: DataTypes.INTEGER,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  }
  // !end
  // !code: moduleExports // !end
);

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
