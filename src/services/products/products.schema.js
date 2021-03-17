// Define the Feathers schema for service `products`. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

// Define the model using JSON-schema
let schema = {
  // !<DEFAULT> code: schema_header
  title: "Products",
  description: "Products database.",
  // !end
  // !code: schema_definitions // !end

  // Required fields.
  required: [
    // !code: schema_required
    "status",
    "value",
    "name",
    "description",
    "quantity",
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
    slug: { type: "string", maxLength: 255 },
    units: { type: "string", maxLength: 255 },
    unit_measure_id: { type: "integer" },
    value: { type: "number" },
    category_id: { type: "integer" },
    shop_id: { type: "integer" },
    quantity: { type: "integer" },
    description: { type: "string" },
    brand: { type: "string", maxLength: 255 },
    discount: { type: "number" },
    status: { type: "string", enum: ["active", "inactive"] },
    short_description: { type: "string" },
    image: { type: "string" },
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
    name: "Product",
    service: {
      sort: { id: 1 },
    },
    // sql: {
    //   sqlTable: 'Products',
    //   uniqueKey: 'id',
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
