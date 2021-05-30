import { MongoClient } from 'mongodb';

const DB = {
  db: null,

  getDB: async () => {
    if (!DB.db) {
      const client = await MongoClient.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
      });

      DB.db = client.db(process.env.APP_NAME);
    }

    return DB.db;
  },
};

export default DB;
