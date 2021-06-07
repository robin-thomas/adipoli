import DbUtil from './index';

const Account = {
  getCollection: async () => {
    const db = await DbUtil.getDB();
    return db.collection('transaction');
  },

  getTransactionsByEmail: async (email) => {
    const collection = await Account.getCollection();
    return await collection.find({ email }).toArray();
  },

  createTransaction: async (params) => {
    const collection = await Account.getCollection();
    return await collection.insertOne({
      ...params,
      created: new Date(),
    });
  },
};

export default Account;
