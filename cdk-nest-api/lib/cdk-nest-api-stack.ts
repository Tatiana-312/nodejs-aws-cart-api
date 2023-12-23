import * as cdk from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Code, Runtime, Function } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import 'dotenv/config';

const { RDS_HOSTNAME, RDS_PORT, RDS_USERNAME, RDS_PASSWORD, RDS_DB_NAME } =
  process.env;

export class CdkNestApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const nestJsLambda = new Function(this, 'CustomerCrudLambda', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'main.handler',
      code: Code.fromAsset('dist'),
      environment: {
        RDS_HOSTNAME: RDS_HOSTNAME!,
        RDS_PORT: RDS_PORT!,
        RDS_USERNAME: RDS_USERNAME!,
        RDS_PASSWORD: RDS_PASSWORD!,
        RDS_DB_NAME: RDS_DB_NAME!,
      },
    });

    const restApi = new RestApi(this, 'CustomerLambdaApi', {
      restApiName: 'NestJS REST API',
    });

    const proxyResource = restApi.root.addResource('{proxy+}'); // Catch-all for any subpath
    proxyResource.addMethod('ANY', new LambdaIntegration(nestJsLambda));
  }
}
