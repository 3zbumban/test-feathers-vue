const { AuthenticationService, JWTStrategy } = require("@feathersjs/authentication");
const { LocalStrategy } = require("@feathersjs/authentication-local");
const { expressOauth } = require("@feathersjs/authentication-oauth");
const logger = require("./logger");

module.exports = app => {
  const authentication = new AuthenticationService(app);

  class MyJWTStategy extends JWTStrategy {
    async parse(req, res) {
      const result = await super.parse(req, res);
      logger.debug(`myjwt/parse: ${JSON.stringify(result)}`);	
      return result;
    }
  }

  authentication.register("jwt", new MyJWTStategy());
  authentication.register("local", new LocalStrategy());

  app.use("/authentication", authentication);
  app.configure(expressOauth());
};
