import * as lambda from '@aws-cdk/aws-lambda';
import {SqsEventSource} from '@aws-cdk/aws-lambda-event-sources';
import {NodejsFunction} from '@aws-cdk/aws-lambda-nodejs';
import * as sns from '@aws-cdk/aws-sns';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import * as sqs from '@aws-cdk/aws-sqs';
import * as cdk from '@aws-cdk/core';
import * as path from 'path';

export class LambdaSnsSqsDlq extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DLQ lambda function resource
    const dlqLambda = new NodejsFunction(this, 'dlq-lambda', {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'main',
      entry: path.join(__dirname, `/../src/dlq-lambda/index.ts`),
    });

    // DLQ resource
    const dlq = new sqs.Queue(this, 'dead-letter-queue', {
      retentionPeriod: cdk.Duration.minutes(30),
    });

    // add DLQ as event source for dlq lambda function
    dlqLambda.addEventSource(new SqsEventSource(dlq));

    // queue resource
    const queue = new sqs.Queue(this, 'sqs-queue', {
      // 👇 set up DLQ
      deadLetterQueue: {
        queue: dlq,
        maxReceiveCount: 1,
      },
    });

    // sns topic resource
    const snsTopic = new sns.Topic(this, 'sns-topic');

    // subscribe queue to topic
    snsTopic.addSubscription(new subs.SqsSubscription(queue));

    // lambda function resource
    const myLambda = new NodejsFunction(this, 'my-lambda', {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'main',
      entry: path.join(__dirname, `/../src/my-lambda/index.ts`),
    });

    // add sqs queue as event source for Lambda
    myLambda.addEventSource(
      new SqsEventSource(queue, {
        batchSize: 10,
      }),
    );

    new cdk.CfnOutput(this, 'snsTopicArn', {
      value: snsTopic.topicArn,
      description: 'SNS topic ARN',
    });
  }
}
