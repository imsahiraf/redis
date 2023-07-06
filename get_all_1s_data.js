const Redis = require('ioredis');

// Create a Redis client
const client = new Redis();

// Function to get the recent data from Redis within a one-second timeframe
async function getRecentDataFromRedis() {
  const currentTime = Math.floor(Date.now() / 1000) * 1000; // Current time in milliseconds
  const startTime = currentTime - 1000; // Start time of the one-second timeframe
  const endTime = currentTime; // End time of the one-second timeframe

  // Get all keys matching the pattern
  const keys = await client.keys('*');

  const recentData = [];

  // Iterate through each key
  for (const key of keys) {
    const data = await client.get(key);

    // Check if the data is within the timeframe
    const timestamp = parseInt(key.split('_')[1]); // Extract the timestamp from the key
console.log(timestamp)
    if (timestamp >= startTime && timestamp <= endTime) {
      recentData.push(data);
    }
  }

  return recentData;
}

// Example usage
setInterval(async () => {
  try {
    const recentData = await getRecentDataFromRedis();
    console.log('Recent data:', recentData);
  } catch (error) {
    console.error('Error:', error);
  }
}, 334); // Retrieve recent data every 334 milliseconds

// You can stop the script by manually terminating it (e.g., by pressing Ctrl+C)
