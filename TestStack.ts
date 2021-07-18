import cdk = require('monocdk');
import apigateway = require('monocdk/aws-apigateway');
import { Runtime, LayerVersion, Function, Code, Tracing } from 'monocdk/aws-lambda';

import dotenv = require('dotenv');
dotenv.config();

export class TestStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // LAYER
    const utilsLayer = new LayerVersion(this, 'utils-layer', {
      compatibleRuntimes: [
        Runtime.NODEJS_10_X,
        Runtime.NODEJS_12_X,
        Runtime.NODEJS_14_X
      ],
      code: Code.fromAsset('./shared/layers/utils'),
      description: 'Error utilities helpful to output error toJson'
    });

    // API GATEWAY
    const api = new apigateway.RestApi(this, 'api', {
      deployOptions: {
        stageName: 'dev'
      }
    });

    const lambdaFunction = new Function(this, id + 'Function', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('handlers/hello'),
      handler: 'app.handler',
      layers: [utilsLayer]
    });

    const resource = api.root.addResource('hello');
    const integration = new apigateway.LambdaIntegration(lambdaFunction);
    resource.addMethod('GET', integration);
    resource.addMethod('POST', integration);
    resource.addMethod('OPTIONS', integration);
  }
}

const app = new cdk.App();

new TestStack(
  app,
  'TestStack'
);

app.synth();
