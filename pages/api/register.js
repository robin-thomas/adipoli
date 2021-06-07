import * as yup from 'yup';

import AccountUtil from '../../utils/db/account';
import WalletUtil from '../../utils/rapyd/wallet';

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const schema = yup.object().shape({
        fullName: yup.string().max(100).required(),
        email: yup.string().email().max(100).required(),
        hash: yup.string().required(),
        salt: yup.string().required(),
      });

      try {
        await schema.isValid(req.body);
      } catch (err) {
        throw new Error('Required fields missing or invalid in request');
      }

      // Check if this email exists.
      const { email } = req.body;
      const account = await AccountUtil.getAccountByEmail(email);
      if (account) {
        throw new Error('Account already exists!');
      }

      const walletId = await WalletUtil.createWallet(email);
      await AccountUtil.createAccount({ ...req.body, walletId });

      res.status(200).json({ walletId });
    } catch (err) {
      res.status(400).json({ statusCode: 400, error: err.message });
    }
  } else {
    res.status(404).json();
  }
}

export default handler;
