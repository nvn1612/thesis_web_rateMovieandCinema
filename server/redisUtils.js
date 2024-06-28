const redis = require('redis');
const { promisify } = require('util');

const redisClient = redis.createClient();

redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

redisClient.connect();


const setAsync = promisify(redisClient.set).bind(redisClient);


const getAsync = promisify(redisClient.get).bind(redisClient);

module.exports = {  
  redisClient,
  setAsync,
  getAsync,
};
