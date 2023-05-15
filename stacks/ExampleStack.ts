import { Api, StackContext } from "sst/constructs";

export function ExampleStack({ stack }: StackContext) {
  // Create the HTTP API
  const api = new Api(stack, "Api", {
    routes: {
      "GET /simple": "packages/functions/src/simple-lambda.handler",
      "GET /long-execution-time":
        "packages/functions/src/get-long-execution-time.handler",
      "GET /long-cold-start":
        "packages/functions/src/get-long-cold-start.handler",
      "GET /test": "packages/functions/src/test.handler",
      "GET /test2": "packages/functions/src/test2.handler",
      "GET /over-three-sec":
        "packages/functions/src/get-over-three-sec.handler",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
