
// Define the Feathers schema for service `users`. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

// Define the model using JSON-schema
let schema = {
  // !<DEFAULT> code: schema_header
  title: 'Users',
  description: 'Users database.',
  // !end
  // !code: schema_definitions // !end

  // Required fields.
  required: [
    // !code: schema_required
    "first_name",
    "last_name",
    "phone",
    "password",
    // !end
  ],
  // Fields with unique values.
  uniqueItemProperties: [
    // !code: schema_unique
    "phone",
    "email",
    // !end
  ],

  // Fields in the model.
  properties: {
    // !code: schema_properties
    first_name: { type: "string", maxLength: 255 },
    last_name: { type: "string", maxLength: 255 },
    email: { type: "string", maxLength: 255 },
    phone: { type: "string", maxLength: 255 },
    password: { type: "string", maxLength: 255 },
    role: { type: "string", enum: ["admin", "user"] },
    permissions: { type: "string" },
    status: { type: "string", enum: ["active", "inactive"] },
    avatar: { type: "string" },
    token_reset_password: { type: "integer" },
    token: { type: "integer" },
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
    name: "User",
    service: {
      sort: { _id: 1 },
    },
    // sql: {
    //   sqlTable: 'Users',
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
