const Redis = require('ioredis');

const client = new Redis({
  host: '127.0.0.1',
  port: 6379,
});

const key = 'my_number';

// Continuously retrieve and display the number from Redis
setInterval(async () => {
  try {
    const number = await client.get(key);
    console.log('Number Retrieved:', number);
  } catch (err) {
    console.error('Error retrieving number:', err);
  }
}, 1000);
