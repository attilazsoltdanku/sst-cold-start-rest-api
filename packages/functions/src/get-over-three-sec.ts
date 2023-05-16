import notes from "@sst-cold-start-rest-api/core/notes";
import * as awsLambda from "aws-lambda";
import * as THREE from "three";
import * as AWS from "aws-sdk";
import * as fs from "fs";
import * as awsCdkLib from "aws-cdk-lib";

const AWSXRay = require("aws-xray-sdk");
const AWS_xray = AWSXRay.captureAWS(require("aws-sdk"));

export const handler: awsLambda.APIGatewayProxyHandlerV2 = async (event) => {
  const scene = new THREE.Scene();
  const aws = new AWS.S3();

  const cdk = new awsCdkLib.App();
  const file = fs;

  return {
    statusCode: 200,
    body: JSON.stringify(notes),
  };
};
