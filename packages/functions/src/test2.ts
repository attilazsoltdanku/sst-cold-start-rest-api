import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import DynamoDB from "aws-sdk/clients/dynamodb";

const dynamo = new DynamoDB();

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  return {
    statusCode: 200,
    body: "hello",
  };
};
