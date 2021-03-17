// Configure the Feathers services. (Can be re-generated.)
let addresses = require("./addresses/addresses.service");
let banners = require("./banners/banners.service");
let categories = require("./categories/categories.service");
let cms = require("./cms/cms.service");
let currentUser = require("./current-user/current-user.service");
let featuredProducts = require("./featured-products/featured-products.service");
let jobScheduleShops = require("./job-schedule-shops/job-schedule-shops.service");
let localities = require("./localities/localities.service");
let notifications = require("./notifications/notifications.service");
let orderDetails = require("./order-details/order-details.service");
let orderHistory = require("./order-history/order-history.service");
let orderStatuses = require("./order-statuses/order-statuses.service");
let orders = require("./orders/orders.service");
let products = require("./products/products.service");
let productsImages = require("./products-images/products-images.service");
let recoveryPassword = require("./recovery-password/recovery-password.service");
let schedule = require("./schedule/schedule.service");
let shippingCost = require("./shipping-cost/shipping-cost.service");
let shopRegisterContact = require("./shop-register-contact/shop-register-contact.service");
let shoppingCart = require("./shopping-cart/shopping-cart.service");
let shoppingCartDetails = require("./shopping-cart-details/shopping-cart-details.service");
let shops = require("./shops/shops.service");
let shopsShippingCost = require("./shops-shipping-cost/shops-shipping-cost.service");
let shopsTypes = require("./shops-types/shops-types.service");
let unitMeasure = require("./unit-measure/unit-measure.service");
let users = require("./users/users.service");
const updateShops = require("./update-shops/update-shops.service.js");

// !code: imports
const firebase = require("firebase-admin");
const usersDevicesTokens = require("./users-devices-tokens/users-devices-tokens.service.js");
const sendPushNotifications = require("./send-push-notifications/send-push-notifications.service");
// !end
// !code: init // !end

// eslint-disable-next-line no-unused-vars
let moduleExports = function (app) {
  app.configure(addresses);
  app.configure(banners);
  app.configure(categories);
  app.configure(cms);
  app.configure(currentUser);
  app.configure(featuredProducts);
  app.configure(jobScheduleShops);
  app.configure(localities);
  app.configure(notifications);
  app.configure(orderDetails);
  app.configure(orderHistory);
  app.configure(orderStatuses);
  app.configure(orders);
  app.configure(products);
  app.configure(productsImages);
  app.configure(recoveryPassword);
  app.configure(schedule);
  app.configure(shippingCost);
  app.configure(shopRegisterContact);
  app.configure(shoppingCart);
  app.configure(shoppingCartDetails);
  app.configure(shops);
  app.configure(shopsShippingCost);
  app.configure(shopsTypes);
  app.configure(unitMeasure);
  app.configure(users);
  app.configure(usersDevicesTokens);
  app.configure(sendPushNotifications);
  app.configure(updateShops);
  // !code: func_return

  var admin = require("firebase-admin");

  var serviceAccount = require("../esnaqui-e304a-firebase-adminsdk-tjifi-15385a0a6b.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://esnaqui-e304a.firebaseio.com",
  });

  app.set("firebase", admin);
  // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
