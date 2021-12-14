/* eslint-disable @typescript-eslint/require-await */
import { 
  S3EventRecord
} from "aws-lambda";

export async function main (event: S3EventRecord) {
  const queries = JSON.stringify(event.s3);
  console.log(queries)
  return {
    statusCode: 200,
    body: `Queries: ${queries}`
  }
} 