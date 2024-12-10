const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => console.log('Redis client error:', err));
  }

  isAlive() {
    return this.client && this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }

  async set(key, value, duration) {
    try {
      await this.client.set(key, value, 'EX', duration);
      return true;
    } catch (err) {
      console.error('Error setting key:', key, err);
      return false;
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
      return true;
    } catch (err) {
      console.error('Error deleting key:', key, err);
      return false;
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
