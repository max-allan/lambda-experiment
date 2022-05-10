export const handler: SQSHandler = async function (event,context) {
    const now = Date.now();
    console.log(`Received event: '${JSON.stringify(event)}'`);
    console.log(`Received context: '${JSON.stringify(context)}'`);
    console.log(`Time now: ${now}`)
    console.log(`delta t: ${now - event.startTime}msec`)
    return (Promise.resolve(`Child received ${JSON.stringify(event)} ${now - event.startTime}msec ago`))
};
