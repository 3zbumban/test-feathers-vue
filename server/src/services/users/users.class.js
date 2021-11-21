const { Service } = require("feathers-nedb");
const logger = require("../../logger");

exports.Users = class Users extends Service {
  async find(params) {
    logger.debug("find");
    const p = await super.find(params);
    logger.debug(`user/find: ${JSON.stringify(p)}`);
    return p;
  }
};
