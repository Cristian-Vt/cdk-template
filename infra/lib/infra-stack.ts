import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import { CfnResource, CustomResource} from '@aws-cdk/core';
// import * as sqs from '@aws-cdk/aws-sqs';

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const s3Bucket = new s3.Bucket(this, 'MyFirstBucket', {
      bucketName: 'sample-bucket-cdk-tutorial-dghagdjagj',
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });

    // s3
    const cfnBucket = s3Bucket.node.defaultChild as s3.CfnBucket;
    let bucketPolicy = s3Bucket.policy?.node.defaultChild as s3.CfnBucketPolicy;
    cfnBucket.overrideLogicalId('myLogicalId');
    bucketPolicy.overrideLogicalId('hello')

    // lambda
    const lambda = scope.node.children[1].node.children[1].node.children[2] as CfnResource
    const logicalIDLambda = lambda.stack.resolve((lambda.logicalId))
    lambda.stack.renameLogicalId(logicalIDLambda, 'loco')

    //role
    const role = scope.node.children[1].node.children[1].node.children[1] as CfnResource
    const logicalIDRole = role.stack.resolve((role.logicalId))
    role.stack.renameLogicalId(logicalIDRole, 'hah')
    
    //custom resource
    const customResource = scope.node.dependencies[0].source as CustomResource;
    const logicalID = customResource.stack.resolve((customResource.node.defaultChild as cdk.CfnElement).logicalId)
    customResource.stack.renameLogicalId(logicalID,'justSpent2DaysFor3LinesOfCode')

    // example resource
    // const queue = new sqs.Queue(this, 'InfraQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
