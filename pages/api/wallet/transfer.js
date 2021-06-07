import * as yup from 'yup';

import AccountUtil from '../../../utils/db/account';
import WalletUtil from '../../../utils/rapyd/wallet';

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const schema = yup.object().shape({
        walletId: yup.string().required(),
        amount: yup.number().min(1).max(999).required(),
        email: yup.string().email().required(),
      });

      try {
        await schema.isValid(req.body);
      } catch (err) {
        throw new Error('Required fields missing or invalid in request');
      }

      // Get the walletId from the user.
      const account = await AccountUtil.getAccountByEmail(req.body.email);
      if (!account) {
        throw new Error('EMAIL_DOES_NOT_EXIST');
      }

      const data = {
        amount: req.body.amount,
        sourceWalletId: req.body.walletId,
        destinationWalletId: account.walletId,
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
