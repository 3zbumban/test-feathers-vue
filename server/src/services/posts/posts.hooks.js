// const { protect } = require("@feathersjs/authentication-local").hooks;
const { authenticate } = require("@feathersjs/authentication").hooks;
const { validateSchema } = require("feathers-hooks-common");
const ajv = require("ajv");

// const logToken = require("../../hooks/log-token");

module.exports = {
  before: {
    all: [ 
      // logToken({auth: true}),
      authenticate("jwt"),
    ],
    find: [],
    get: [],
    create: [
      validateSchema({
        properties: {
          user: {
            type: "string",
          },
          text: {
            type: "string",
          }
        },
        required: ["user", "text"]
      }, ajv)
    ],
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
    all: [      
      context => {
        // throw new Error("😎");
        return context;
      }
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
