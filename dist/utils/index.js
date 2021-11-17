"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestCreator = void 0;
const restful_1 = require("./restful");
const types_1 = require("../types");
function requestCreator(apiKey, secret) {
    const rest = (0, restful_1.restCreator)(apiKey, secret);
    return {
        get: rest(types_1.HttpMethod.GET),
        post: rest(types_1.HttpMethod.POST),
    };
}
exports.requestCreator = requestCreator;
//# sourceMappingURL=index.js.map