import * as yup from 'yup';

import WalletUtil from '../../../utils/rapyd/wallet';

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const schema = yup.object().shape({
        walletId: yup.string().required(),
        amount: yup.number().min(1).max(999).required(),
      });

      try {
        await schema.isValid(req.body);
      } catch (err) {
        throw new Error('Required fields missing or invalid in request');
      }

      const data = {
        amount: req.body.amount,
        sourceWalletId: req.body.walletId,
        destinationWalletId: process.env.APP_WALLET_ID,
      };

      await WalletUtil.transfer(data);

      res.status(200).json({ statusCode: 200, success: true });
    } catch (err) {
      res.status(400).json({ statusCode: 400, error: err.message });
    }
  } else {
    res.status(404).json();
  }
}

export default handler;
