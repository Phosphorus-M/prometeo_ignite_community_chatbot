const { createClient } = require("redis");

// Connecting to redis
  const RedisClient = createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD
    });

module.exports = RedisClient;
  