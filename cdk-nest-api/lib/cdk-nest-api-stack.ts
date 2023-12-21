import * as cdk from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Code, Runtime, Function } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class CdkNestApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const nestJsLambda = new Function(this, 'CustomerCrudLambda', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'main.handler',
      code: Code.fromAsset('dist'),
    });

    const restApi = new RestApi(this, 'CustomerLambdaApi', {
      restApiName: 'NestJS REST API',
    });

    const proxyResource = restApi.root.addResource('{proxy+}'); // Catch-all for any subpath
    proxyResource.addMethod('ANY', new LambdaIntegration(nestJsLambda));
  }
}
