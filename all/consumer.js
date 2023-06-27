const Redis = require('ioredis');

async function consumeRandomNumber() {
  const redis = new Redis();
  const subscriber = new Redis();

  subscriber.subscribe('randomNumberChannel', (err) => {
    if (err) {
      console.error('Error subscribing to channel:', err);
    } else {
      console.log('Subscribed to channel: randomNumberChannel');
    }
  });

  subscriber.on('message', (channel, message) => {
    console.log(`Received random number: ${message}`);
    // Perform any desired processing with the received number
  });
}

consumeRandomNumber().catch(console.error);
