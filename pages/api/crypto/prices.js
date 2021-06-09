import CoingeckoUtil from '../../../utils/coingecko/price';

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const prices = await CoingeckoUtil.getPrices();

      res.status(200).json({ statusCode: 200, success: true, prices });
    } catch (err) {
      console.error(err);
      res.status(400).json({ statusCode: 400, error: err.message });
    }
  } else {
    res.status(404).json();
  }
}

export default handler;
