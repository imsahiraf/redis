const Redis = require('ioredis');

async function produceRandomNumber() {
  const redis = new Redis();

  while (true) {
    const randomNumber = Math.floor(Math.random() * 100); // Generate a random number between 0 and 99
    await redis.publish('randomNumberChannel', randomNumber.toString());
    console.log(`Published random number: ${randomNumber}`);
    await sleep(1000); // Wait for 1 second before publishing the next number
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

produceRandomNumber().catch(console.error);
