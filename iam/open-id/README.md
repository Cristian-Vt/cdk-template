**Why**

- Open Id provides credentials at run time and after the build is finished the credentials are destroyed. Therefore you don't need to manage IAM users.

**What are the benefits**

- Short lived creds - It helps you deploy your aws resources and you don't need to manage credentials. Open ID is managing credentials
- A great description of how the CircleCi-OpenId integration can be found [Here](https://circleci.com/blog/openid-connect-identity-tokens/)

**How to run the project - integrate it in your Circle Ci?**

1. assume aws credentials in your console
2. cd circleci-openid 
3. npm run i
4. npm run cdk -- deploy
5. read .circleci/config.yml where a simple example of the integration is provided. aws context is required by design

6. add the step to your pipeline

```
version: '2.1'
orbs:
  aws-cli: circleci/aws-cli@3.1
jobs:
  aws-cli-example:
    executor: aws-cli/default
    steps:
      - checkout
      - aws-cli/setup:
          profile-name: WEB-IDENTITY-PROFILE
          role-arn: 'arn:aws:iam::"${AWS_ACCOUNT_ID}":role/circleCiIdentityTrustProvider'
          role-session-name: open-id
      - run: 
          command: aws s3 ls --region us-west-2 --profile WEB-IDENTITY-PROFILE
workflows:
  aws-cli:
    jobs:
      - aws-cli-example:
          context: 
            - cdk-template
```