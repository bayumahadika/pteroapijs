const axios = require("axios");

class Client {
  #client;
  constructor(baseUrl, clientKey) {
    this.#client = axios.create({
      baseURL: `${baseUrl}/api/client`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${clientKey}`,
      },
    });
  }
}

module.exports = Client;
