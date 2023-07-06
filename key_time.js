const Redis = require('ioredis');

// Create a Redis client
const client = new Redis();

// Function to get the timestamp from a Redis key
function getTimestampFromKey(key) {
  const timestampString = key.split('_')[1]; // Assuming the timestamp is separated by an underscore (_)
  return parseInt(timestampString);
}

// Example usage
async function retrieveDataWithTimestamp() {
  const keys = await client.keys('*');

  for (const key of keys) {
    const timestamp = getTimestampFromKey(key);
    console.log('Key:', key);
    console.log('Timestamp:', timestamp);
  }
}

// Call the function to retrieve data with timestamps
retrieveDataWithTimestamp()
  .then(() => {
    client.quit(); // Close the Redis client connection
  })
  .catch(error => {
    console.error('Error:', error);
    client.quit(); // Close the Redis client connection in case of an error
  });
