"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3LambdaNotificationsStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const path = __importStar(require("path"));
class S3LambdaNotificationsStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const lambdaFunction = new aws_cdk_lib_1.aws_lambda_nodejs.NodejsFunction(this, 'lambda-function', {
            memorySize: 1024,
            timeout: aws_cdk_lib_1.Duration.seconds(5),
            runtime: aws_cdk_lib_1.aws_lambda.Runtime.NODEJS_14_X,
            handler: 'main',
            entry: path.join(__dirname, `/../src/my-lambda/index.ts`),
            bundling: {
                minify: true,
                externalModules: ['aws-sdk'],
            },
        });
        const s3Bucket = new aws_cdk_lib_1.aws_s3.Bucket(this, 's3-bucket', {
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });
        s3Bucket.addEventNotification(aws_cdk_lib_1.aws_s3.EventType.OBJECT_CREATED, new aws_cdk_lib_1.aws_s3_notifications.LambdaDestination(lambdaFunction));
        new aws_cdk_lib_1.CfnOutput(this, 'bucketName', {
            value: s3Bucket.bucketName,
        });
    }
}
exports.S3LambdaNotificationsStack = S3LambdaNotificationsStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiczNfbGFtYmRhX25vdGlmaWNhdGlvbnMtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzM19sYW1iZGFfbm90aWZpY2F0aW9ucy1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQWlKO0FBRWpKLDJDQUE2QjtBQUU3QixNQUFhLDBCQUEyQixTQUFRLG1CQUFLO0lBQ25ELFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFHeEIsTUFBTSxjQUFjLEdBQUcsSUFBSSwrQkFBaUIsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQ25GLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLE9BQU8sRUFBRSxzQkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDNUIsT0FBTyxFQUFFLHdCQUFVLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDdkMsT0FBTyxFQUFFLE1BQU07WUFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsNEJBQTRCLENBQUM7WUFDekQsUUFBUSxFQUFFO2dCQUNSLE1BQU0sRUFBRSxJQUFJO2dCQUNaLGVBQWUsRUFBRSxDQUFDLFNBQVMsQ0FBQzthQUM3QjtTQUNGLENBQUMsQ0FBQztRQUdILE1BQU0sUUFBUSxHQUFHLElBQUksb0JBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRTtZQUNwRCxhQUFhLEVBQUUsMkJBQWEsQ0FBQyxPQUFPO1lBQ3BDLGlCQUFpQixFQUFFLElBQUk7U0FDeEIsQ0FBQyxDQUFDO1FBR0gsUUFBUSxDQUFDLG9CQUFvQixDQUMzQixvQkFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQy9CLElBQUksa0NBQW9CLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBRTNELENBQUM7UUFFRixJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNoQyxLQUFLLEVBQUUsUUFBUSxDQUFDLFVBQVU7U0FDM0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBbENELGdFQWtDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzLCBSZW1vdmFsUG9saWN5LCBhd3NfczMsIGF3c19zM19ub3RpZmljYXRpb25zLCBEdXJhdGlvbiwgYXdzX2xhbWJkYV9ub2RlanMsIGF3c19sYW1iZGEsIENmbk91dHB1dCB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcblxuZXhwb3J0IGNsYXNzIFMzTGFtYmRhTm90aWZpY2F0aW9uc1N0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vIPCfkYcgZGVmaW5lIGxhbWJkYVxuICAgIGNvbnN0IGxhbWJkYUZ1bmN0aW9uID0gbmV3IGF3c19sYW1iZGFfbm9kZWpzLk5vZGVqc0Z1bmN0aW9uKHRoaXMsICdsYW1iZGEtZnVuY3Rpb24nLCB7XG4gICAgICBtZW1vcnlTaXplOiAxMDI0LFxuICAgICAgdGltZW91dDogRHVyYXRpb24uc2Vjb25kcyg1KSxcbiAgICAgIHJ1bnRpbWU6IGF3c19sYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgIGhhbmRsZXI6ICdtYWluJyxcbiAgICAgIGVudHJ5OiBwYXRoLmpvaW4oX19kaXJuYW1lLCBgLy4uL3NyYy9teS1sYW1iZGEvaW5kZXgudHNgKSxcbiAgICAgIGJ1bmRsaW5nOiB7XG4gICAgICAgIG1pbmlmeTogdHJ1ZSxcbiAgICAgICAgZXh0ZXJuYWxNb2R1bGVzOiBbJ2F3cy1zZGsnXSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvLyDwn5GHIGNyZWF0ZSBidWNrZXRcbiAgICBjb25zdCBzM0J1Y2tldCA9IG5ldyBhd3NfczMuQnVja2V0KHRoaXMsICdzMy1idWNrZXQnLCB7XG4gICAgICByZW1vdmFsUG9saWN5OiBSZW1vdmFsUG9saWN5LkRFU1RST1ksXG4gICAgICBhdXRvRGVsZXRlT2JqZWN0czogdHJ1ZSxcbiAgICB9KTtcblxuICAgIC8vIGludm9rZSBsYW1iZGEgZXZlcnkgdGltZSBhbiBvYmplY3QgaXMgY3JlYXRlZCBpbiB0aGUgYnVja2V0XG4gICAgczNCdWNrZXQuYWRkRXZlbnROb3RpZmljYXRpb24oXG4gICAgICBhd3NfczMuRXZlbnRUeXBlLk9CSkVDVF9DUkVBVEVELFxuICAgICAgbmV3IGF3c19zM19ub3RpZmljYXRpb25zLkxhbWJkYURlc3RpbmF0aW9uKGxhbWJkYUZ1bmN0aW9uKSxcbiAgICAgIC8vIHtwcmVmaXg6ICd0ZXN0LycsIHN1ZmZpeDogJy55YW1sJ30sXG4gICAgKTtcblxuICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ2J1Y2tldE5hbWUnLCB7XG4gICAgICB2YWx1ZTogczNCdWNrZXQuYnVja2V0TmFtZSxcbiAgICB9KTtcbiAgfVxufVxuIl19