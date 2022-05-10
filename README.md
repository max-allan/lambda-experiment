# Lambda parent/child invoke

git clone me. Login to AWS. Install npm/cdk/etc.
```
cd lambda-experiment/aws
npm i
cdk deploy
```

Wait for it. Go to the Lambda console and do a test run on the parent. Any event is OK, it doesn't use the event.

The first parent run will never start a child. (if you wait 5+ minutes)

If you then run parent several times, you should see after about 4/5th run, some response from the child, like :
```
  Payload: '"Child received {\\"request\\":\\"5ed477cd-4949-4c22-b5e6-fd627389c648\\",\\"startTime\\":\\"1652198802884\\"} 46457msec ago"'
```

