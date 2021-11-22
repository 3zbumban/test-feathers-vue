const { protect } = require("@feathersjs/authentication-local").hooks;
const { authenticate } = require("@feathersjs/authentication").hooks;

// const logToken = require("../../hooks/log-token");

module.exports = {
  before: {
    all: [ 
      // logToken({auth: true}),
      authenticate("jwt"),
      protect(["accessToken", "authentication"])
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
