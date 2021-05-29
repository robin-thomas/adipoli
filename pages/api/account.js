import WalletUtil from '../../utils/rapyd/wallet';

async function handler(req, res) {
  try {
    const response = await WalletUtil.createWallet();
    res.status(200).json({ ewallet: response });
  } catch (err) {
    res.status(400).json({ statusCode:400, error: err.message });
  }
}

export default handler;
