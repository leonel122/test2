
// Define the Feathers schema for service `orders`. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

// Define the model using JSON-schema
let schema = {
  // !<DEFAULT> code: schema_header
  title: 'Orders',
  description: 'Orders database.',
  // !end
  // !code: schema_definitions // !end

  // Required fields.
  required: [
    // !code: schema_required // !end
  ],
  // Fields with unique values.
  uniqueItemProperties: [
    // !code: schema_unique // !end
  ],

  // Fields in the model.
  properties: {
    // !code: schema_properties
    shop_id: { type: "integer" },
    user_id: { type: "integer" },
    value: { type: "number" },
    total_value: { type: "number" },
    shipping_cost: { type: "number" },
    order_status_id: { type: "integer" },
    shopping_cart_id: { type: "integer" },
    delivery_time: { type: "string" },
    meta_data: { type: "string" },
    shop_meta_data: { type: "string" },
    shipping_meta_data: { type: "string" },
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
    name: "Order",
    service: {
      sort: { id: 1 },
    },
    // sql: {
    //   sqlTable: 'Orders',
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
