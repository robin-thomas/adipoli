import DbUtil from './index';

const Account = {
  getCollection: async () => {
    const db = await DbUtil.getDB();
    return db.collection('crypto');
  },

  getBalance: async (walletId) => {
    const collection = await Account.getCollection();
    const crupto = await collection.findOnce({ walletId });
    return crypto.balance;
  },

  upsert: async (walletId, params) => {
    const collection = await Account.getCollection();

    return await collection.updateOne(
      { walletId },
      {
        $set: {
          ...params,
          modified: new Date(),
        },
      },
      { upsert: true }
    );
  },
};

export default Account;
