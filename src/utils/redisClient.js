const redis = require('redis');

const redisClient = redis.createClient({
  url: 'redis://localhost:6379', 
  // password: 'your_redis_password', 
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

// Connect to Redis
(async () => {
  await redisClient.connect();
  console.log('Connected to Redis');
})();

module.exports = redisClient;
