
// featuredProducts-model.js - A Sequelize model. (Can be re-generated.)
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const merge = require('lodash.merge')
// !<DEFAULT> code: sequelize_schema
const sequelizeSchema = require('../services/featured-products/featured-products.sequelize')
// !end
// !code: sequelize_imports
const categoriesModel = require("./categories.model");
const productsModel = require("./products.model");
// !end
// !code: sequelize_init // !end

let moduleExports = function (app) {
  let sequelizeClient = app.get('sequelizeClient')
  // !code: sequelize_func_init // !end

  const featuredProducts = sequelizeClient.define('featured_products',
    // !<DEFAULT> code: sequelize_model
    sequelizeSchema,
    // !end
    merge(
      // !<DEFAULT> code: sequelize_options
      {
        hooks: {
          beforeCount(options) {
            options.raw = true
          },
        },
      },
      // !end
      // !code: sequelize_define // !end
    )
  )

  // eslint-disable-next-line no-unused-vars
  featuredProducts.associate = function (models) {
    // Define associations here for foreign keys
    //   - No foreign keys defined.
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    // !code: sequelize_associations
    featuredProducts.belongsTo(categoriesModel(app), {
      foreignKey: "category_id",
      onDelete: "RESTRICT",
    });
    featuredProducts.belongsTo(productsModel(app), {
      foreignKey: "product_id",
      onDelete: "RESTRICT",
    });
    // !end
  }

  // !code: sequelize_func_return // !end
  return featuredProducts
}
// !code: sequelize_more // !end

// !code: sequelize_exports // !end
module.exports = moduleExports

// !code: sequelize_funcs // !end
// !code: sequelize_end // !end
