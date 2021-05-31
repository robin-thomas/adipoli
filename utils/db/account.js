import DbUtil from './index';

const Account = {
  createAccount: async ({ email, mobile, walletId }) => {
    const db = await DbUtil.getDB();
    const collection = db.collection('account');

    await collection.insertOne({
      email,
      mobile,
      walletId,
      created: new Date(),
    });
  },

  getAccount: async (email) => {
    const db = await DbUtil.getDB();
    const collection = db.collection('account');

    return await collection.findOne({ email });
  },
};

export default Account;
