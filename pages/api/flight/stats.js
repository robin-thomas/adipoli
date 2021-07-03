import withCache from '../../../utils/middleware/cache';

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      if (!req.cache.has('delay')) {
        return res.status(200).json({ score: 50 });
      }

      const dates = req.cache.get('delay')[req.query.flight];
      const totalDelay = Object.keys(dates).reduce((p, c) => p + c, 0);
      const avgDelay = Math.ceil(totalDelay / Object.keys(dates).length);

      const score = Math.ceil(100 - (avgDelay < 85 ? 100 - avgDelay : 15));

      res.status(200).json({ score });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ statusCode: 400, error: err.message });
    }
  } else {
    res.status(404).json();
  }
}

export default withCache(handler);
