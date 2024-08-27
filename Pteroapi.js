const Client = require("./Client");
const Application = require("./Application");

class Pteroapijs {
  #baseUrl;
  constructor(baseUrl) {
    this.#baseUrl = baseUrl;
  }
  client(clientKey) {
    return new Client(this.#baseUrl, clientKey);
  }
  application(applicationKey) {
    return new Application(this.#baseUrl, applicationKey);
  }
}

module.exports = Pteroapijs;
