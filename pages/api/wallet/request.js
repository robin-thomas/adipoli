import * as yup from 'yup';

import WalletUtil from '../../../utils/rapyd/wallet';

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const schema = yup.object().shape({
        walletId: yup.string().required(),
        amount: yup.number().required(),
      });

      try {
        await schema.isValid(req.body);
      } catch (err) {
        throw new Error('Required fields missing or invalid in request');
      }

      const url = await WalletUtil.requestPayment(req.body);

      res.status(200).json({ statusCode: 200, success: true, url });
    } catch (err) {
      console.error(err);
      res.status(400).json({ statusCode: 400, error: err.message });
    }
  } else {
    res.status(404).json();
  }
}

export default handler;
