import AccountUtil from '../../utils/db/account';
import WalletUtil from '../../utils/rapyd/wallet';

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, mobile } = req.body;

      if (!email || !mobile) {
        throw new Error('Required fields missing in request');
      }

      const walletId = await WalletUtil.createWallet(email);
      await AccountUtil.createAccount({ email, mobile, walletId });

      res.status(200).json({ walletId });
    } catch (err) {
      res.status(400).json({ statusCode: 400, error: err.message });
    }
  } else {
    res.status(404).json();
  }
}

export default handler;
