const Redis = require('ioredis');

async function getAndContinueProducingNumbers() {
  const redis = new Redis();
  let sequence = 0;

  // Retrieve previously published numbers
  const publishedNumbers = await redis.lrange('publishedNumbers', 0, -1);
  console.log('Previously published numbers:', publishedNumbers);
  
  if (publishedNumbers.length > 0) {
    sequence = parseInt(publishedNumbers[publishedNumbers.length - 1], 10) + 1;
    console.log('Starting sequence from:', sequence);
  }

  // Start producing new numbers
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

getAndContinueProducingNumbers().catch(console.error);
