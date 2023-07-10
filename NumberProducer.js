const Redis = require('ioredis');
const channel = 'numbers';

async function produceNumbers() {
  const redisPublisher = new Redis();
  let num = 0;

  setInterval(() => {
    redisPublisher.publish(channel, num.toString());
    console.log('Published', num)
    num++;
  }, 1000);
}

produceNumbers().catch(console.error);
