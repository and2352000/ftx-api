const restCreator = require("./restful");

function requestCreator(apiKey, secret) {
  const rest = restCreator(apiKey, secret);
  return {
    get: rest("GET"),
    post: rest("POST"),
    delete: rest("DELETE"),
    put: rest("PUT"),
  };
}

module.exports = requestCreator;
