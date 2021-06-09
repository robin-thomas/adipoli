import DbUtil from './index';

const Account = {
  getCollection: async () => {
    const db = await DbUtil.getDB();
    return db.collection('crypto');
  },

  getBalance: async (walletId) => {
    const collection = await Account.getCollection();
    const crypto = await collection.findOne({ walletId });

    return {
      tokens: crypto?.tokens || {},
      balance: 0,
    };
  },

  createBalance: async (walletId) => {
    const collection = await Account.getCollection();

    return await collection.insertOne({
      walletId,
      tokens: {},
      created: new Date(),
      modified: new Date(),
    });
  },

  updateBalance: async ({ walletId, token }, decrease = false) => {
    const collection = await Account.getCollection();

    return await collection.find({ walletId }).forEach((doc) => {
      if (!(token.id in doc.tokens)) {
        doc.tokens[token.id] = 0;
      }

      if (decrease) {
        doc.tokens[token.id] -= token.amount;
      } else {
        doc.tokens[token.id] += token.amount;
      }

      doc.modified = new Date();

      collection.save(doc);
    });
  },
};

export default Account;
