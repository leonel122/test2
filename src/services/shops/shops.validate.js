
/* eslint quotes: 0 */
// Validation definitions for validateSchema hook for service `shops`. (Can be re-generated.)
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
    title: "Shops",
    description: "Shops database.",
    required: [
      "name",
      "user_id",
      "category_id"
    ],
    uniqueItemProperties: [],
    properties: {
      name: {
        type: "string",
        maxLength: 255
      },
      nit: {
        type: "string",
        maxLength: 255
      },
      user_id: {
        type: "integer"
      },
      category_id: {
        type: "integer"
      },
      person_type: {
        type: "string",
        enum: [
          "legal",
          "natural"
        ]
      },
      full_name: {
        type: "string",
        maxLength: 255
      },
      document_type: {
        type: "string",
        enum: [
          "CC",
          "CE",
          "PPN",
          "NIT"
        ]
      },
      status: {
        type: "string",
        enum: [
          "Activa",
          "Desactivada",
          "Bloqueada"
        ]
      },
      address: {
        type: "string",
        maxLength: 255
      },
      opening_time: {
        type: "string",
        format: "time"
      },
      closing_time: {
        type: "string",
        format: "time"
      },
      long: {
        type: "string",
        maxLength: 255
      },
      lat: {
        type: "string",
        maxLength: 255
      },
      logo: {
        type: "string"
      },
      phone: {
        type: "string",
        maxLength: 255
      },
      link_facebook: {
        type: "string"
      },
      link_instagram: {
        type: "string"
      },
      quantity_time_preparation: {
        type: "number"
      },
      type_time_preparation: {
        type: "string",
        enum: [
          "minutes",
          "hours"
        ]
      },
      current_status: {
        type: "string",
        enum: [
          "open",
          "close"
        ]
      },
      schedule_description: {
        type: "string"
      },
      whatsapp: {
        type: "string"
      },
      priority: {
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
