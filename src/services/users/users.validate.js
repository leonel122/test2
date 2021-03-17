
/* eslint quotes: 0 */
// Validation definitions for validateSchema hook for service `users`. (Can be re-generated.)
const { validateSchema } = require('feathers-hooks-common')
const merge = require('lodash.merge')
const ajv = require('ajv')
// !code: imports // !end
// !code: init // !end

// !<DEFAULT> code: set_id_type
// eslint-disable-next-line no-unused-vars
const ID = 'integer'
// !end

let base = merge({},
  // !<DEFAULT> code: base
  {
    title: "Users",
    description: "Users database.",
    required: [
      "first_name",
      "last_name",
      "phone",
      "password"
    ],
    uniqueItemProperties: [
      "phone",
      "email"
    ],
    properties: {
      first_name: {
        type: "string",
        maxLength: 255
      },
      last_name: {
        type: "string",
        maxLength: 255
      },
      email: {
        type: "string",
        maxLength: 255
      },
      phone: {
        type: "string",
        maxLength: 255
      },
      password: {
        type: "string",
        maxLength: 255
      },
      role: {
        type: "string",
        enum: [
          "admin",
          "user"
        ]
      },
      permissions: {
        type: "string"
      },
      status: {
        type: "string",
        enum: [
          "active",
          "inactive"
        ]
      },
      avatar: {
        type: "string"
      },
      token_reset_password: {
        type: "integer"
      },
      deletedAt: {
        type: "string",
        format: "date-time"
      }
    }
  },
  // !end
  // !code: base_more // !end
)
// !code: base_change // !end

let create = merge({},
  base,
  // !code: create_more // !end
)

let update = merge({},
  base,
  // !code: update_more // !end
)

let patch = merge({},
  base,
  // !code: patch_more // !end
)
delete patch.required
// !code: all_change // !end

let validateCreate = options => {
  // !<DEFAULT> code: func_create
  return validateSchema(create, ajv, options)
  // !end
}

let validateUpdate = options => {
  // !<DEFAULT> code: func_update
  return validateSchema(update, ajv, options)
  // !end
}

let validatePatch = options => {
  // !<DEFAULT> code: func_patch
  return validateSchema(patch, ajv, options)
  // !end
}

let quickValidate = (method, data, options) => {
  try {
    if (method === 'create') { validateCreate(options)({ type: 'before', method: 'create', data }) }
    if (method === 'update') { validateCreate(options)({ type: 'before', method: 'update', data }) }
    if (method === 'patch') { validateCreate(options)({ type: 'before', method: 'patch', data }) }
  } catch (err) {
    return err
  }
}
// !code: validate_change // !end

let moduleExports = {
  create,
  update,
  patch,
  validateCreate,
  validateUpdate,
  validatePatch,
  quickValidate,
  // !code: moduleExports // !end
}

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
