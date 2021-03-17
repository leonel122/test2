
// shoppingCartDetails-model.js - A Sequelize model. (Can be re-generated.)
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const merge = require('lodash.merge')
// !<DEFAULT> code: sequelize_schema
const sequelizeSchema = require('../services/shopping-cart-details/shopping-cart-details.sequelize')
// !end
// !code: sequelize_imports
const shoppingCartModel = require("./shopping-cart.model");
const productModel = require("./products.model");
const shopModel = require("./shops.model");
// !end
// !code: sequelize_init // !end

let moduleExports = function (app) {
  let sequelizeClient = app.get('sequelizeClient')
  // !code: sequelize_func_init // !end

  const shoppingCartDetails = sequelizeClient.define('shopping_cart_details',
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
  shoppingCartDetails.associate = function (models) {
    // Define associations here for foreign keys
    //   - No foreign keys defined.
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    // !code: sequelize_associations
    shoppingCartDetails.belongsTo(shoppingCartModel(app), {
      foreignKey: "shopping_cart_id",
      onDelete: "RESTRICT",
    });
    shoppingCartDetails.belongsTo(productModel(app), {
      foreignKey: "product_id",
      onDelete: "RESTRICT",
    });
    shoppingCartDetails.belongsTo(shopModel(app), {
      foreignKey: "shop_id",
      onDelete: "RESTRICT",
    });

    // !end
  }

  // !code: sequelize_func_return // !end
  return shoppingCartDetails
}
// !code: sequelize_more // !end

// !code: sequelize_exports // !end
module.exports = moduleExports

// !code: sequelize_funcs // !end
// !code: sequelize_end // !end
