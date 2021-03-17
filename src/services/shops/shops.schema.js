// Define the Feathers schema for service `shops`. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

// Define the model using JSON-schema
let schema = {
  // !<DEFAULT> code: schema_header
  title: "Shops",
  description: "Shops database.",
  // !end
  // !code: schema_definitions // !end

  // Required fields.
  required: [
    // !code: schema_required
    "name",
    "user_id",
    "category_id",
    // !end
  ],
  // Fields with unique values.
  uniqueItemProperties: [
    // !code: schema_unique // !end
  ],

  // Fields in the model.
  properties: {
    // !code: schema_properties
    name: { type: "string", maxLength: 255 },
    slug: { type: "string", maxLength: 25 },
    nit: { type: "string", maxLength: 255 },
    user_id: { type: "integer" },
    category_id: { type: "integer" },
    person_type: { type: "string", enum: ["legal", "natural"] },
    full_name: { type: "string", maxLength: 255 },
    document_type: { type: "string", enum: ["CC", "CE", "PPN", "NIT"] },
    status: { type: "string", enum: ["Activa", "Desactivada", "Bloqueada"] },
    address: { type: "string", maxLength: 255 },
    opening_time: { type: "string", format: "time" },
    closing_time: { type: "string", format: "time" },
    long: { type: "string", maxLength: 255 },
    lat: { type: "string", maxLength: 255 },
    logo: { type: "string" },
    phone: { type: "string", maxLength: 255 },
    link_facebook: { type: "string" },
    link_instagram: { type: "string" },
    quantity_time_preparation: { type: "number" },
    type_time_preparation: { type: "string", enum: ["minutes", "hours"] },
    current_status: { type: "string", enum: ["open", "close"] },
    schedule_description: { type: "string" },
    whatsapp: { type: "string" },
    priority: { type: "integer" },
    deletedAt: { type: "string", format: "date-time" },
    // !end
  },
  // !code: schema_more // !end
};

// Define optional, non-JSON-schema extensions.
let extensions = {
  // GraphQL generation.
  graphql: {
    // !code: graphql_header
    name: "Shop",
    service: {
      sort: { _id: 1 },
    },
    // sql: {
    //   sqlTable: 'Shops',
    //   uniqueKey: '_id',
    //   sqlColumn: {
    //     __authorId__: '__author_id__',
    //   },
    // },
    // !end
    discard: [
      // !code: graphql_discard // !end
    ],
    add: {
      // !<DEFAULT> code: graphql_add
      // __author__: { type: '__User__!', args: false, relation: { ourTable: '__authorId__', otherTable: 'id' } },
      // !end
    },
    // !code: graphql_more // !end
  },
};

// !code: more // !end

let moduleExports = {
  schema,
  extensions,
  // !code: moduleExports // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
