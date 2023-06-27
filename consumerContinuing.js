const Redis = require('ioredis');

async function consumeAndContinueProducingNumbers() {
  const redis = new Redis();
  const subscriber = new Redis();

  // Retrieve previously published numbers
  const publishedNumbers = await redis.lrange('publishedNumbers', 0, -1);
  console.log('Previously published numbers:', publishedNumbers);

  // Subscribe to the channel and receive new numbers
  subscriber.subscribe('sequentialNumberChannel', (err) => {
    if (err) {
      console.error('Error subscribing to channel:', err);
    } else {
      console.log('Subscribed to channel: sequentialNumberChannel');
    }
  });

  subscriber.on('message', (channel, message) => {
    console.log(`Received sequential number: ${message}`);
    // Perform any desired processing with the received number
  });

}

consumeAndContinueProducingNumbers().catch(console.error);
