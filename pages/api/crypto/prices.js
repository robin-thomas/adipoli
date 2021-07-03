import { withCryptoCache } from '../../../utils/middleware/cache';
import CoingeckoUtil from '../../../utils/coingecko/price';

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      if (!req.cache.has('price')) {
        const resp = await CoingeckoUtil.getPrices();
        req.cache.set('price', resp);
      }

      const _prices = req.cache.get('price');

      const prices = Object.keys(_prices).reduce(
        (p, t) => ({ ...p, [t]: _prices[t].usd }),
        {}
      );

      res.status(200).json({ statusCode: 200, success: true, prices });
    } catch (err) {
      console.error(err);
      res.status(400).json({ statusCode: 400, error: err.message });
    }
  } else {
    res.status(404).json();
  }
}

export default withCryptoCache(handler);
