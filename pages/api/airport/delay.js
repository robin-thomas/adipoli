import Axios from 'axios';

import withCache from '../../../utils/middleware/cache';
import config from '../../../config/config.json';

const getFlights = async (req) => {
  const url = config.aviationstack.api.getFlightByDeparture
    .replace('{from}', req.query.airport)
    .replace('{appKey}', process.env.AVIATIONSTACK_APPKEY);

  const response = await Axios({
    baseURL: process.env.AVIATIONSTACK_BASE_URL,
    method: 'get',
    url,
  });

  const { data } = response;
  return data;
};

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const cacheKey = `airport-delay-${req.query.airport}`;

      if (req.cache.has(cacheKey)) {
        return res.status(200).json({ score: req.cache.get(cacheKey) });
      }

      const flights = await getFlights(req);
      const delays = flights.data.map((e) => e.departure.delay);

      const totalDelay = delays.reduce((p, c) => p + c, 0);
      const avgDelay = delays.length > 0 ? totalDelay / delays.length : 0;

      const score = Math.ceil(100 - (avgDelay < 85 ? 100 - avgDelay : 15));
      req.cache.set(cacheKey, score);

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
