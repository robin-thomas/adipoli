import DbUtil from './index';

const Account = {
  getCollection: async () => {
    const db = await DbUtil.getDB();
    return db.collection('transaction');
  },

  getTransactions: async (walletId) => {
    const collection = await Account.getCollection();
    return await collection.find({ walletId }).toArray();
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
