import * as cdk from '@aws-cdk/core';
// import * as sqs from '@aws-cdk/aws-sqs';
import * as sqs from '@aws-cdk/aws-lambda';
import * as nodejslambda from '@aws-cdk/aws-lambda-nodejs';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';

export class LambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'LambdaQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const child = new nodejslambda.NodejsFunction(this, "child", {
      runtime: lambda.Runtime.NODEJS_14_X,
      entry: 'functions/child/index.ts',
      handler: 'handler',
      memorySize: 512,
      retryAttempts: 0,
      timeout: cdk.Duration.seconds(10),
    });


    const parent = new nodejslambda.NodejsFunction(this, "parent", {
      runtime: lambda.Runtime.NODEJS_14_X,
      entry: 'functions/parent/index.ts',
      handler: 'handler',
      memorySize: 512,
      retryAttempts: 0,
      timeout: cdk.Duration.seconds(10),
      environment: {
        CHILD: child.functionName,
      },
    });
    parent.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      resources: [child.functionArn],
      actions: ["lambda:InvokeFunction"]
    }));
  }
}
