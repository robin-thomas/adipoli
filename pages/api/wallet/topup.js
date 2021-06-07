import * as yup from 'yup';

import WalletUtil from '../../../utils/rapyd/wallet';

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const schema = yup.object().shape({
        walletId: yup.string().required(),
        amount: yup.number().min(1).max(999).required(),
        card: yup
          .object()
          .shape({
            type: yup.string().required(),
            fields: yup
              .object()
              .shape({
                expiry: yup.string().required(),
                number: yup.string().min(19).max(21).required(),
                name: yup.string().max(100).required(),
                cvv: yup.number().min(100).max(9999).required(),
              })
              .required(),
          })
          .required(),
      });

      try {
        await schema.isValid(req.body);
      } catch (err) {
        throw new Error('Required fields missing or invalid in request');
      }

      await WalletUtil.topUp(req.body);

      res.status(200).json({ statusCode: 200, success: true });
    } catch (err) {
      res.status(400).json({ statusCode: 400, error: err.message });
    }
  } else {
    res.status(404).json();
  }
}

export default handler;
