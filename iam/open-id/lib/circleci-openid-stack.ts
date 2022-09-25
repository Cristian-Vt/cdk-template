import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

export interface CircleciOpenidStackProps extends StackProps {
  /**
    * Name of the deploy role to assume in Circle Ci pipelines.
    */
  readonly deployRole: string;
  /**
   * The audience is the client ID issued by the Identity provider for Circle Ci.
   * You can find this value in the Circle Ci OrganizationID
   * 
   */
  readonly circleCiAudience: string;
  /**
   * The Circle Ci Domain is the secure OpenID Connect URL used for authentication
   *
   */
  readonly circleCiDomain: string;
}

export class CircleciOpenidStack extends Stack {
  constructor(scope: Construct, id: string, props: CircleciOpenidStackProps) {
    super(scope, id, props);

    const circleCiProvider = new iam.OpenIdConnectProvider(
    this,
    'circleCiIdentityProvider',
    {
      url: `https://${props.circleCiDomain}${props.circleCiAudience}`,
      clientIds: [props.circleCiAudience],
    }
    );

    const conditions: iam.Conditions = {
      StringEquals: {
        [`${props.circleCiDomain}${props.circleCiAudience}:aud`]: props.circleCiAudience,
      },
    };

    new iam.Role(this, 'CircleCiDeployRole', {
      assumedBy: new iam.WebIdentityPrincipal(
        circleCiProvider.openIdConnectProviderArn,
        conditions
      ),
      managedPolicies: [
        /**
          * It is recommended that you asses the types of permissions your workload needs
          * and you give strict permissions - this is an example of having admin permissions 
          * which is not recommended 
          */
        iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'),
      ],
      roleName: props.deployRole,
      description:
        'This role is used by Circle Ci to authenticate and deploy to AWS',
      maxSessionDuration: Duration.hours(1), //increase this if you know there's a possibility for your stacks to go in an idle state and resolve after a while 
    });
  }
}
