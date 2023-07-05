const Redis = require('ioredis');

async function subscribeToSequentialNumbers() {
  const redis = new Redis();
  const subscriber = new Redis();
  let lastGeneratedNumber = null;

  // Retrieve the last generated number, if available
  const publishedNumbers = await redis.lrange('publishedNumbers', -1, -1);
  if (publishedNumbers.length > 0) {
    lastGeneratedNumber = parseInt(publishedNumbers[0], 10);
  }

  // Subscribe to the channel and receive new numbers
  subscriber.subscribe('sequentialNumberChannel', (err) => {
    if (err) {
      console.error('Error subscribing to channel:', err);
    } else {
      console.log('Subscribed to channel: sequentialNumberChannel');
      if (lastGeneratedNumber !== null) {
        console.log('Last generated number:', lastGeneratedNumber);
      } else {
        console.log('The producer is yet to generate a number.');
      }
    }
  });

  subscriber.on('message', (channel, message) => {
    console.log(`Received sequential number: ${message}`);
    lastGeneratedNumber = parseInt(message, 10);
    // Perform any desired processing with the received number
  });
}

subscribeToSequentialNumbers().catch(console.error);
