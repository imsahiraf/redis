const { json } = require('express');
const Redis = require('ioredis');

async function getPublishedNumbers() {
  const redis = new Redis();
  const publishedNumbers = await redis.lrange('publishedNumbers', 0, -1);
  console.log('Previously published numbers:', JSON.stringify(publishedNumbers));
}

getPublishedNumbers().catch(console.error);