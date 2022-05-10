import { Lambda } from 'aws-sdk';
const lambda = new Lambda();

export const handler: SQSHandler = async function (event,context) {
    try {
      const now = Date.now();
      message = `Starting run: ${context.awsRequestId} at ${now}`
      console.log(message);
      var params = {
         FunctionName: process.env.CHILD!,
         InvocationType: 'RequestResponse',
         Payload: `{ "request": "${context.awsRequestId}" , "startTime" : "${now}"}`
      };
      console.log(params);
      lambda.invoke(params, function(err, data) {
         if (err) {
             console.log("There was an error running the child lambda.");
             console.log(err, err.stack);
         } else {
             console.log("The child lambda ran without error.");
             console.log(data);
         }
      });

    } catch (error) {
        console.error(error);
    }
};
