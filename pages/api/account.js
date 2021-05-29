import WalletUtil from '../../utils/rapyd/wallet';

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body;

      const walletId = await WalletUtil.createWallet(email);
      res.status(200).json({ walletId });
    } catch (err) {
      res.status(400).json({ statusCode:400, error: err.message });
    }
  } else {
    res.status(404).json();
  }
}

export default handler;
