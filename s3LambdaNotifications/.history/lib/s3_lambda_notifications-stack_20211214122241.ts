import { Stack, StackProps, RemovalPolicy, CfnOutput, aws_lambda, aws_s3, aws_s3_notifications } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';

export class S3LambdaNotificationsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // 👇 define lambda
    const lambdaFunction = new aws_lambda.Function(this, 'lambda-function', {
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      handler: 'main',
      code: aws_lambda.Code.fromAsset(path.join(__dirname, '/../src/my-lambda/index')),
    });

    // 👇 create bucket
    const s3Bucket = new aws_s3.Bucket(this, 's3-bucket', {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // invoke lambda every time an object is created in the bucket
    s3Bucket.addEventNotification(
      aws_s3.EventType.OBJECT_CREATED,
      new aws_s3_notifications.LambdaDestination(lambdaFunction),
      // {prefix: 'test/', suffix: '.yaml'},
    );

    new CfnOutput(this, 'bucketName', {
      value: s3Bucket.bucketName,
    });
  }
}
