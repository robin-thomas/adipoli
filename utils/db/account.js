import DbUtil from './index';

const Account = {
  createAccount: async (body) => {
    const db = await DbUtil.getDB();
    const collection = db.collection('account');
    await collection.insertOne({ ...body, created: new Date() });
  },

  getAccountByEmail: async (email) => {
    const db = await DbUtil.getDB();
    const collection = db.collection('account');

    return await collection.findOne({ email });
  },
};

export default Account;
