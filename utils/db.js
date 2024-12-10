const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    this.DB_HOST = process.env.DB_HOST || 'localhost';
    this.DB_PORT = process.env.DB_PORT || 27017;
    this.DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
    this.db = null;
    this.connected = false;

  }

  async connect() {
    const uri = `mongodb://${this.DB_HOST}:${this.DB_PORT}`;
    try {
      const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
      this.db = client.db(this.DB_DATABASE);
      this.connected = true;
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err.message);
      this.connected = false;
    }
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    try {
      const count = await this.db.collection('users').countDocuments();
      return count;
    } catch (err) {
      console.error('Error counting documents in users collection:', err);
      return null;
    }
  }

  async nbFiles() {
    try {
      const count = await this.db.collection('files').countDocuments();
      return count;
    } catch (err) {
      console.error('Error counting documents in files collection:', err);
      return null;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
