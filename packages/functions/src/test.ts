import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import AWS from 'aws-sdk';

const DynamoDB = AWS.DynamoDB;
const dynamo = new DynamoDB(); 

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  return {
    statusCode: 200,
    body: "hello cold start",
  };
};
