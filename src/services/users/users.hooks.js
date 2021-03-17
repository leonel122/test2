
// Hooks for service `users`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common')
const { authenticate } = require('@feathersjs/authentication').hooks
// eslint-disable-next-line no-unused-vars
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks
// eslint-disable-next-line no-unused-vars
const proccessUsersBeforeCreate = require('./hooks/proccess-users-before-create')
// eslint-disable-next-line no-unused-vars
const searchUsers = require('./hooks/search-users')
// !code: imports

const activateUser = require("./hooks/active-user");
const sendToken = require("./hooks/send-token");
const updatePhone = require("./hooks/update-phone")
// !end

// !code: used
// eslint-disable-next-line no-unused-vars
const { iff, softDelete2, isProvider, fastJoin } = commonHooks;
// eslint-disable-next-line no-unused-vars
const {
  create,
  update,
  patch,
  validateCreate,
  validateUpdate,
  validatePatch,
} = require("./users.validate");
// !end

// !code: init
const UserJoin = {
  joins: {
    join: () => async (records, context) => {
      [records.shop, records.address] = await Promise.all([
        context.app
          .service("shops")
          .find({ query: { user_id: context.result.id }, paginate: false })
          .then((it) => it[0]),
        context.app
          .service("addresses")
          .find({
            query: { user_id: context.result.id, main: "true" },
            paginate: false,
          })
          .then((it) => it[0]),
      ]);
    },
  },
};
// !end

let moduleExports = {
  before: {
    // Your hooks should include:
    //   find  : authenticate('jwt')
    //   get   : authenticate('jwt')
    //   create: hashPassword()
    //   update: hashPassword(), authenticate('jwt')
    //   patch : hashPassword(), authenticate('jwt')
    //   remove: authenticate('jwt')
    // !code: before
    all: [],
    find: [softDelete2(), iff(isProvider("external"), searchUsers())],
    get: [iff(isProvider("external"), searchUsers())],
    create: [hashPassword(), softDelete2(), iff(isProvider("external"), proccessUsersBeforeCreate())],
    update: [hashPassword(), authenticate("jwt")],
    patch: [hashPassword(), authenticate("jwt"), softDelete2(), activateUser(),updatePhone()],
    remove: [authenticate("jwt"), softDelete2()],
    // !end
  },

  after: {
    // Your hooks should include:
    //   all   : protect('password') /* Must always be the last hook */
    // !code: after
    all: [
      protect("password"),
      softDelete2() /* Must always be the last hook */,
    ],
    find: [fastJoin(UserJoin)],
    get: [fastJoin(UserJoin)],
    create: [sendToken()],
    update: [],
    patch: [sendToken()],
    remove: [],
    // !end
  },

  error: {
    // !<DEFAULT> code: error
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
    // !end
  },
  // !code: moduleExports // !end
}

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
