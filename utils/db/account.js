import DbUtil from './index';

const Account = {
  getCollection: async () => {
    const db = await DbUtil.getDB();
    return db.collection('account');
  },

  createAccount: async (body) => {
    const collection = await Account.getCollection();
    await collection.insertOne({ ...body, created: new Date() });
  },

  getAccountByEmail: async (email) => {
    const collection = await Account.getCollection();
    return await collection.findOne({ email });
  },
};

export default Account;
