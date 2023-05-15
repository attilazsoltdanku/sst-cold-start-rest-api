"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleStack = void 0;
const constructs_1 = require("sst/constructs");
function ExampleStack({ stack }) {
    // Create the HTTP API
    const api = new constructs_1.Api(stack, "Api", {
        routes: {
            "GET /simple": "packages/functions/src/simple-lambda.handler",
            "GET /long-execution-time": "packages/functions/src/get-long-execution-time.handler",
            "PUT /long-cold-start": "packages/functions/src/get-long-cold-start.handler",
        },
    });
    // Show the API endpoint in the output
    stack.addOutputs({
        ApiEndpoint: api.url,
    });
}
exports.ExampleStack = ExampleStack;
