const { NotAcceptable } = require("@feathersjs/errors");
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {
  checkContext,
  getItems,
  replaceItems,
} = require("feathers-hooks-common");
const { reduceRight } = require("lodash");
const algolia = require("../../../utils/algolia");

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  // Return the actual hook.
  return async (context) => {
    // Throw if the hook is being called from an unexpected location.
    checkContext(context, null, ["create", "patch"]);

    // Get the authenticated user.
    // eslint-disable-next-line no-unused-vars
    const { user } = context.params;
    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    const records = getItems(context);

    const algoliaCredemtials = context.app.get("algolia");

    const Algolia = new algolia(
      "products",
      algoliaCredemtials.appId,
      algoliaCredemtials.apiKey
    );

    if (records.status == "active") {
      const shop = await context.app
        .service("shops")
        .getModel()
        .findOne({ where: { id: records.shop_id } });

      if (shop.status == "Activa") {
        console.log("ppppppppppppppppppppp");

        console.log(records);
        records.objectID = parseInt(records.id);
        // records.createdAtUnix = Math.floor(records.createdAt / 1000);
        // records.updatedAtUnix = Math.floor(records.updatedAt / 1000);
        delete records.unit_measure_id;
        delete records.units;
        records.description ? delete records.description : null;
        records.short_description ? delete records.short_description : null;
        records.discount ? delete records.discount : null;
        records.description ? delete records.description : null;
        if (records.shop) {
          records.shop.nit ? delete records.shop.nit : null;
          records.shop.user_id ? delete records.shop.user_id : null;
          records.shop.person_type ? delete records.shop.person_type : null;
          records.shop.full_name ? delete records.shop.full_name : null;
          delete records.shop.document_type;
          delete records.shop.opening_time;
          records.shop.link_facebook ? delete records.shop.link_facebook : null;
          records.shop.link_instagram
            ? delete records.shop.link_instagram
            : null;
          records.shop.whatsapp ? delete records.shop.whatsapp : null;
          records.shop.schedule_description
            ? delete records.shop.schedule_description
            : null;
          records.shop.category ? delete records.shop.category : null;
          records.shop.open ? delete records.shop.open : null;
          delete records.shop.quantity_time_preparation;
          delete records.shop.type_time_preparation;
          delete records.shop.schedule_description;
        }

        Algolia.save(records);
      }
    } else if (records.status == "inactive") {
      Algolia.remove(records.id);
    }

    // Place the modified records back in the context.
    replaceItems(context, records);
    // Best practice: hooks should always return the context.
    return context;
  };
};

// Throw on unrecoverable error.
// eslint-disable-next-line no-unused-vars
function error(msg) {
  throw new Error(msg);
}
