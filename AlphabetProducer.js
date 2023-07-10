const Redis = require('ioredis');
const channel = 'alphabets';

async function produceAlphabets() {
  const redisPublisher = new Redis();
  let charCode = 97; // 'a'

  setInterval(() => {
    const char = String.fromCharCode(charCode);
    console.log('Published', char)
    redisPublisher.publish(channel, char);
    charCode = (charCode + 1) % 123; // Wraps around after 'z'
  }, 1000);
}

produceAlphabets().catch(console.error);
