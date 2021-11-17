import { restCreator } from "./restful";
import { HttpMethod } from "../types";

function requestCreator(apiKey: string, secret: string) {
  const rest = restCreator(apiKey, secret);
  return {
    get: rest(HttpMethod.GET),
    post: rest(HttpMethod.POST),
  };
}

export { requestCreator };
