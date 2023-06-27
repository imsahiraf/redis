const Redis = require('ioredis');

async function produceSequentialNumber() {
  const redis = new Redis();
  let sequence = 0;

  while (true) {
    await redis.publish('sequentialNumberChannel', sequence.toString());
    console.log(`Published sequential number: ${sequence}`);
    await redis.rpush('publishedNumbers', sequence.toString()); // Store the published number
    sequence++;
    await sleep(1000); // Wait for 1 second before publishing the next number
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

produceSequentialNumber().catch(console.error);