const Redis = require('ioredis');

async function consumeSequentialNumber() {
  const redis = new Redis();
  const subscriber = new Redis();
  let sequence = 0;

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

consumeSequentialNumber().catch(console.error);