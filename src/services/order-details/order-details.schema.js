
// Define the Feathers schema for service `orderDetails`. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

// Define the model using JSON-schema
let schema = {
  // !<DEFAULT> code: schema_header
  title: 'OrderDetails',
  description: 'OrderDetails database.',
  // !end
  // !code: schema_definitions // !end

  // Required fields.
  required: [
    // !code: schema_required
    "quantity",
    "value_per_product",
    "product_id",
    // !end
  ],
  // Fields with unique values.
  uniqueItemProperties: [
    // !code: schema_unique // !end
  ],

  // Fields in the model.
  properties: {
    // !code: schema_properties
    quantity: { type: "integer" },
    value_per_product: { type: "number" },
    value_total: { type: "number" },
    product_id: { type: "integer" },
    order_id: { type: "integer" },
    meta_product: { type: "string" },
    notes: { type: "string" },
    deletedAt: { type: "string", format: "date-time" },
    // !end
  },
  // !code: schema_more // !end
}

// Define optional, non-JSON-schema extensions.
let extensions = {
  // GraphQL generation.
  graphql: {
    // !code: graphql_header
    name: "OrderDetail",
    service: {
      sort: { id: 1 },
    },
    // sql: {
    //   sqlTable: 'OrderDetails',
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
}

// !code: more // !end

let moduleExports = {
  schema,
  extensions,
  // !code: moduleExports // !end
}

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
