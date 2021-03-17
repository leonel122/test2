const { AbilityBuilder, Ability } = require("@casl/ability");
const { toMongoQuery } = require("@casl/mongoose");
const { Forbidden } = require("@feathersjs/errors");
const TYPE_KEY = Symbol.for("type");

Ability.addAlias("update", "patch");
Ability.addAlias("read", ["get", "find"]);
Ability.addAlias("delete", "remove");

function subjectName(subject) {
  if (!subject || typeof subject === "string") {
    return subject;
  }

  return subject[TYPE_KEY];
}

async function defineAbilitiesFor(user, context) {
  const { rules, can } = AbilityBuilder.extract();

  can("create", [
    "users",
    "addresses",
    "shop-register-contact",
    "recovery-password",
    "users-devices-tokens",
    "shopping-cart",
  ]);
  can("read", [
    "categories",
    "shops",
    "products",
    "localities",
    "cms",
    "banners",
    "notifications",
    "featured-products",
    "shopping-cart",
    "shopping-cart-details",
  ]);
  /* if (!user) throw new Forbidden('Debes autenticarte.') */

  // if (user.shop) {
  //   can('update', [
  //     'orders'
  //   ], { shop_id: user.shop.id })
  // }

  //los usuarios logeados (poner servicios debajo)
  can("create", ["current-user", "shopping-cart"]);
  if (user) {
    can("read", ["users"], { id: user.id });
    can("update", ["users"], { id: user.id });

    can("read", ["current-user"]);
    if (user.role == "user" && user.status == "active") {
      can("create", [
        "orders",
        "users",
        "addresses",
        "shopping-cart-details",
        "shopping-cart",
        "shopping-cart-details",
      ]);

      can("remove", ["shopping-cart-details", "shopping-cart"]);
      can("remove", ["addresses"], { user_id: user.id });
      can("update", ["orders"]);
      can("read", ["orders", "addresses"], {
        user_id: user.id,
      });
      can("update", ["addresses"], { user_id: user.id });

      const shop = await context.app
        .service("shops")
        .getModel()
        .findOne({ where: { user_id: user.id, deletedAt: -1 } });

      if (shop) {
        can("read", ["shops"], { id: shop.id });
        can("create", ["shipping-cost", "products", "schedule"]);
        can("create", ["shipping-cost", "products"]);
        can("manage", ["shops"], { id: shop.id });
        can("manage", ["shipping-cost", "products", "schedule"], {
          shop_id: shop.id,
        });
        can("read", ["orders"], { shop_id: shop.id });
      }
    }

    //los usuarios administradores (poner permisos a servicios debajo)
    if (user.role == "admin") {
      can("manage", "all");
    }
  }

  if (process.env.NODE_ENV !== "production") {
    can("create", ["users"]);
  }

  return new Ability(rules, { subjectName });
}

function canReadQuery(query) {
  return query !== null;
}

module.exports = function authorize(name = null) {
  return async function (hook) {
    const action = hook.method;
    const service = name ? hook.app.service(name) : hook.service;
    const serviceName = name || hook.path;
    const ability = await defineAbilitiesFor(hook.params.user, hook);
    const throwUnlessCan = (action, resource) => {
      if (ability.cannot(action, resource)) {
        throw new Forbidden(
          `No tienes permisos para ${action} en el servicio ${serviceName}`
        );
      }
    };

    hook.params.ability = ability;

    if (hook.method === "create") {
      hook.data[TYPE_KEY] = serviceName;
      throwUnlessCan("create", hook.data);
    }

    if (!hook.id) {
      const query = toMongoQuery(ability, serviceName, action);

      if (canReadQuery(query)) {
        Object.assign(hook.params.query, query);
      } else {
        // The only issue with this is that user will see total amount of records in db
        // for the resources which he shouldn't know.
        // Alternative solution is to assign `__nonExistingField` property to query
        // but then feathers-mongoose will send a query to MongoDB which for sure will return empty result
        // and may be quite slow for big datasets
        hook.params.query = hook.params.query ? hook.params.query : {};
        hook.params.query = { ...hook.params.query, id: 0 };
        // hook.params.query.$limit = 0;
      }

      return hook;
    }

    const params = Object.assign({}, hook.params, { provider: null });
    const result = await service.get(hook.id, params);

    result[TYPE_KEY] = serviceName;
    throwUnlessCan(action, result);

    if (action === "get") {
      hook.result = result;
    }

    return hook;
  };
};
