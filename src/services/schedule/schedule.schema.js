
// Define the Feathers schema for service `schedule`. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

// Define the model using JSON-schema
let schema = {
  // !<DEFAULT> code: schema_header
  title: 'Schedule',
  description: 'Schedule database.',
  // !end
  // !code: schema_definitions // !end

  // Required fields.
  required: [
    // !code: schema_required
    "day",
    "shop_id",
    "start_hour",
    "end_hour",
    // !end
  ],
  // Fields with unique values.
  uniqueItemProperties: [
    // !code: schema_unique // !end
  ],

  // Fields in the model.
  properties: {
    // !code: schema_properties
    day: { type: "string", enum: ["0", "1", "2", "3", "4", "5", "6"] },
    shop_id: { type: "integer" },
    start_hour: { type: "string", format: "time" },
    end_hour: { type: "string", format: "time" },
    status: { type: "string", enum: ["active", "inactive"] },
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
    name: "Schedule",
    service: {
      sort: { id: 1 },
    },
    // sql: {
    //   sqlTable: 'Schedule',
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
