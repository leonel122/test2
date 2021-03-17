/* eslint quotes: 0 */
// Defines Sequelize model for service `shops`. (Can be re-generated.)
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
    nit: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    person_type: {
      type: Sequelize.ENUM(["legal", "natural"]),
    },
    full_name: {
      type: DataTypes.STRING,
    },
    document_type: {
      type: Sequelize.ENUM(["CC", "CE", "PPN", "NIT"]),
    },
    status: {
      type: Sequelize.ENUM(["Activa", "Desactivada", "Bloqueada"]),
    },
    address: {
      type: DataTypes.STRING,
    },
    opening_time: {
      type: DataTypes.TEXT,
    },
    closing_time: {
      type: DataTypes.TEXT,
    },
    long: {
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.STRING,
    },
    logo: {
      type: DataTypes.TEXT,
    },
    phone: {
      type: DataTypes.STRING,
    },
    link_facebook: {
      type: DataTypes.TEXT,
    },
    link_instagram: {
      type: DataTypes.TEXT,
    },
    quantity_time_preparation: {
      type: DataTypes.REAL,
    },
    type_time_preparation: {
      type: Sequelize.ENUM(["minutes", "hours"]),
    },
    current_status: {
      type: Sequelize.ENUM(["open", "close"]),
    },
    schedule_description: {
      type: DataTypes.TEXT,
    },
    whatsapp: {
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
