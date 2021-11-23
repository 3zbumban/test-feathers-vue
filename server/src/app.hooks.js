// Application hooks that run for every service
const { protect } = require("@feathersjs/authentication-local").hooks;
const { iff, isProvider } = require("feathers-hooks-common");

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      protect("password"),
      iff(isProvider("external"), protect("strategy")),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [
      // context => {
      //   console.log(context);
      // }
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
