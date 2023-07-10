const Redis = require('ioredis');
const numArr = [1, 2];
const num = numArr[(Math.floor(Math.random() * numArr.length))];
console.log('The data Selected now is', num)
var dataArr = ['numbers', 'alphabets'];
var newData = [];

for (var i = 0; i < num; i++) {
  var randomIndex = Math.floor(Math.random() * dataArr.length);
  newData.push(dataArr[randomIndex]);
}

console.log(newData);

async function receiveData() {
  const redisSubscriber = new Redis();
  redisSubscriber.subscribe(newData);

  redisSubscriber.on('message', (channel, message) => {
    console.log(`Received data from channel ${channel}: ${message}`);
  });
}

receiveData().catch(console.error);
