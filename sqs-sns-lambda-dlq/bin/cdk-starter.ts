#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import {LambdaSnsSqsDlq} from '../lib/lambda-dlq-sns-sqs-resource';

const app = new cdk.App();
new LambdaSnsSqsDlq(app, 'lambda-sns-sqs-dlq', {
  stackName: 'lambda-sns-sqs-dlq',
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
