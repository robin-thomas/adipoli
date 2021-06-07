import * as yup from 'yup';

import WalletUtil from '../../../../utils/rapyd/wallet';

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const schema = yup.object().shape({
        walletId: yup.string().required(),
      });

      try {
        await schema.isValid(req.query);
      } catch (err) {
        throw new Error('Required fields missing or invalid in request');
      }

      const transactions = await WalletUtil.getTransactions(req.query.walletId);

      res.status(200).json({ statusCode: 200, success: true, transactions });
    } catch (err) {
      console.error(err);
      res.status(400).json({ statusCode: 400, error: err.message });
    }
  } else {
    res.status(404).json();
  }
}

export default handler;
