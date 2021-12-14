/* eslint-disable @typescript-eslint/require-await */
// import { 
//   S3EventRecord
// } from "aws-lambda";

// export async function main (event: S3EventRecord) {
//   const queries = JSON.stringify(event.s3, null, 4);
//   console.log(queries)
//   return {
//     statusCode: 200,
//     body: `Queries: ${queries}`
//   }
// } 

async function main(event) {
  console.log('event', JSON.stringify(event));
  return {
    body: JSON.stringify({message: 'Success'}),
    statusCode: 200,
  };
};

module.exports = {main}