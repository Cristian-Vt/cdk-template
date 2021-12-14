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


// export async function main(
//   event: APIGatewayProxyEventV2,
// ): Promise<APIGatewayProxyResultV2> {
//   console.log('event 👉', event);

//   return {
//     body: JSON.stringify({message: 'Successful lambda invocation'}),
//     statusCode: 200,
//   };
// }



// (async function main(event) {
//   console.log('event is 👉', JSON.stringify(event, null, 4));
//   return {
//     body: JSON.stringify({message: 'Success! 🎉🎉🎉'}),
//     statusCode: 200,
//   };
// })();

// module.exports = {main};
