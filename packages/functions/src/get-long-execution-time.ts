import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  await simulateDelay();

  // Return a response
  const response = {
    statusCode: 200,
    body: "long execution time",
  };
  return response;
};

async function simulateDelay() {
  // Await a promise that resolves after 10 seconds
  await new Promise((resolve) => setTimeout(resolve, 5000));
}
