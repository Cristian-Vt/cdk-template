# Process

1. Create SQS that subscribes to SNS

Publish a message to the sns topic with 

aws sns publish \
    --subject "Testing" \
    --message "Hello world" \
    --topic-arn "sns_arn_from_cdk-outputs.json_created_in_root_directory"


2. Create Lambda and ad SQS as event source for the lambda function
    - lambda pools for messages every 20 sec by default 
    - lambda code in src/my-lambda/index.ts

3. Create DLQ - target for messages not processed correctly 
4. Create new lambda to process dlq messages
    - add dlq as event source
